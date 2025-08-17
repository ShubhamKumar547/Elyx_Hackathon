import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./ComponentHealthIdDropdown.css";

const ComponentHealthIdDropdown = ({ onSelect }) => {
  const [healthIds, setHealthIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthIds = async () => {
      setLoading(true);
      setError(null);
      try {
        let baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
        const res = await fetch(`${baseUrl}/data/healthIds`);
        const data = await res.json();
        if (data.success) {
          setHealthIds(data.data);
          setLoading(false);
        } else {
          setTimeout(() => {
            setError("Failed to fetch health IDs");
            setLoading(false);
          }, 5000);
        }
      } catch (err) {
        setTimeout(() => {
          setError(err.message || "Error fetching health IDs");
          setLoading(false);
        }, 5000);
      }
    };
    fetchHealthIds();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    setIsOpen(false);
    if (onSelect) {
      onSelect(id);
    }
  };

  if (loading) {
    return (
      <div className="component-health-id-dropdown loading">
        <div className="loading-spinner"></div>
        <p>Loading health IDs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-health-id-dropdown error">
        <p>
          Error loading health IDs: {error}, Maybe the server is sleeping.
          Please refresh
        </p>
      </div>
    );
  }

  return (
    <div className="component-health-id-dropdown">
      <h2 className="component-health-id-dropdown-title">User Health IDs</h2>
      <p className="component-health-id-dropdown-subtitle">
        Select a user from the dropdown
      </p>

      <div className="component-health-id-dropdown-container">
        <div
          className={`component-health-id-dropdown-header ${
            isOpen ? "open" : ""
          }`}
          onClick={toggleDropdown}
        >
          {selectedId ? (
            <div className="component-health-id-dropdown-selected">
              <span className="component-health-id-dropdown-id">
                {selectedId}
              </span>
              {healthIds.find((user) => user.id === selectedId)?.name && (
                <span className="component-health-id-dropdown-name">
                  {healthIds.find((user) => user.id === selectedId).name}
                </span>
              )}
            </div>
          ) : (
            <span className="component-health-id-dropdown-placeholder">
              Select a health ID
            </span>
          )}
          <svg
            className={`component-health-id-dropdown-arrow ${
              isOpen ? "open" : ""
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>

        {isOpen && (
          <div className="component-health-id-dropdown-list">
            {healthIds.map((user) => (
              <div
                key={user.id}
                className={`component-health-id-dropdown-item ${
                  selectedId === user.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(user.id)}
              >
                <span className="component-health-id-dropdown-item-id">
                  {user.id}
                </span>
                <span className="component-health-id-dropdown-item-name">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedId && (
        <div className="component-health-id-dropdown-selection-info">
          <p>
            Currently selected: <strong>{selectedId}</strong>
          </p>
          {healthIds.find((user) => user.id === selectedId)?.name && (
            <p>
              User:{" "}
              <strong>
                {healthIds.find((user) => user.id === selectedId).name}
              </strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentHealthIdDropdown;
