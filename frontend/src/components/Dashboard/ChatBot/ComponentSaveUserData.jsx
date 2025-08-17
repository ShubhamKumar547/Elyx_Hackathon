import React, { useState } from "react";
import "./ComponentSaveUserData.css";

const stages = [
  "Uploading Data...",
  "Preprocessing Chat...",
  "Extracting Health Insights...",
  "Analyzing Trends...",
  "Finalizing User Profile...",
  "Completed!"
];

function ComponentSaveUserData() {
  const [healthId, setHealthId] = useState("");
  const [chatData, setChatData] = useState("");
  const [processingStage, setProcessingStage] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStage(0);
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < stages.length) {
        setProcessingStage(stage);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 10000); // 10 seconds per stage
  };

  return (
    <div className="ComponentSaveUserData-container">
      <h2 className="ComponentSaveUserData-title">Save New User Data</h2>
      <form className="ComponentSaveUserData-form" onSubmit={handleSubmit}>
        <div className="ComponentSaveUserData-field">
          <label htmlFor="healthId">Health ID</label>
          <input
            id="healthId"
            type="text"
            value={healthId}
            onChange={(e) => setHealthId(e.target.value)}
            placeholder="Enter Health ID"
            required
            className="ComponentSaveUserData-input"
          />
        </div>
        <div className="ComponentSaveUserData-field">
          <label htmlFor="chatData">WhatsApp Chat (8 months)</label>
          <textarea
            id="chatData"
            value={chatData}
            onChange={(e) => setChatData(e.target.value)}
            placeholder="Paste WhatsApp chat here"
            rows={8}
            required
            className="ComponentSaveUserData-textarea"
          />
        </div>
        <button
          type="submit"
          className="ComponentSaveUserData-btn"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Save Data"}
        </button>
      </form>
      {isProcessing && (
        <div className="ComponentSaveUserData-stages">
          <h3>Processing Stages</h3>
          <ul>
            {stages.map((stage, idx) => (
              <li
                key={stage}
                className={
                  idx === processingStage
                    ? "ComponentSaveUserData-stage-active"
                    : idx < processingStage
                    ? "ComponentSaveUserData-stage-complete"
                    : "ComponentSaveUserData-stage"
                }
              >
                {stage}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ComponentSaveUserData;
