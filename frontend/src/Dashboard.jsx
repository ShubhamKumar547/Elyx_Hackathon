import React, { useState } from "react";
import "./Dashboard.css";
import ComponentInternalMetrics from "./components/Dashboard/ChatBot/ComponentInternalMetrics.jsx";
import PersonaDetails from "./components/Dashboard/ChatBot/PersonaDetails";
import TextInputWithAPI from "./components/Dashboard/ChatBot/TextInputWithAPI";
import TrendView from "./components/Dashboard/TrendsView/TrendsView";
import ComponentHealthIdDropdown from "./Utility/ComponentHealthIdDropdown";
import ComponentSaveUserData from "./components/Dashboard/ChatBot/ComponentSaveUserData";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("trend");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelection = (id) => {
    setSelectedUser(id);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Health Intelligence Dashboard</h1>
          <p className="last-updated">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        <ComponentHealthIdDropdown onSelect={handleUserSelection} />

        {selectedUser === "HID-78945612" && (
          <div>
            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${activeTab === "trend" ? "active" : ""}`}
                onClick={() => setActiveTab("trend")}
              >
                Trend
              </button>
              <button
                className={`tab-btn ${activeTab === "chatbot" ? "active" : ""}`}
                onClick={() => setActiveTab("chatbot")}
              >
                ChatBot
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "internal-metrics" ? "active" : ""
                }`}
                onClick={() => setActiveTab("internal-metrics")}
              >
                Internal Metrics
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "persona-details" ? "active" : ""
                }`}
                onClick={() => setActiveTab("persona-details")}
              >
                Persona Details
              </button>
              
            </div>

            <main className="dashboard-content">
              {activeTab === "trend" && <TrendView />}
              {activeTab === "chatbot" && (
                <div className="chatbot-view">
                  <TextInputWithAPI
                    apiCallFunction={(input) =>
                      Promise.resolve(`Response for: ${input}`)
                    }
                  />
                </div>
              )}
              {activeTab === "internal-metrics" && (
                <div className="internal-metrics-view">
                  <h2>Internal Metrics</h2>
                  <ComponentInternalMetrics />
                </div>
              )}
              {activeTab === "persona-details" && (
                <div className="persona-details-view">
                  <h2>Persona Details</h2>
                  <PersonaDetails />
                </div>
              )}
              {/* {activeTab === "save-user-data" && (
                <div className="save-user-data-view">
                  <ComponentSaveUserData />
                </div>
              )} */}
            </main>
          </div>
        )}
      </header>
    </div>
  );
}

export default Dashboard;
