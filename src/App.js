import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState();

  const API_KEY = process.env.REACT_APP_ELEVEN_LABS_API_KEY;
  const voiceId ="CwhRBWXzGAHq8TQ4Fs17";

  const handleClick = async () => {
    if (!text) {
      alert("Please enter the text to use this feature");
      return;
    }
    setLoading(true);
    setAudioUrl(null);

    try {
      // Making a POST request to the relative URL
      const response = await fetch(`/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        body: JSON.stringify({
          text: text, // User input text
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.8,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.log(error);
      alert("Failed to load", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h1>Text-to-Voice with Eleven Labs API</h1>
      <textarea
        placeholder="Enter your text here.."
        cols={50}
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={handleClick}
        disabled={loading}
      >
        Generate Voice
      </button>
      {true && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Audio is here:</h3>
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default App;
