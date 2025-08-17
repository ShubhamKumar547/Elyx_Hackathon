import React, { useState, useEffect } from 'react';
import './ComponentHealthIdDropdown.css';

const ComponentHealthIdDropdown = ({ onSelect }) => {
  const [healthIds, setHealthIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchHealthIds = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, you would fetch from an actual endpoint
        const mockData = [
          { id: 'HID-78945612', name: 'Rohan' },
          { id: 'HID-12345678', name: 'Jane Smith' },
          { id: 'HID-98765432', name: 'Robert Johnson' },
          { id: 'HID-65432178', name: 'Emily Davis' },
          { id: 'HID-32165498', name: 'Michael Wilson' },
          { id: 'HID-45612378', name: 'Sarah Brown' },
          { id: 'HID-85296374', name: 'David Taylor' },
          { id: 'HID-74185296', name: 'Jessica Martinez' },
        ];
        
        setHealthIds(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
        <p>Error loading health IDs: {error}</p>
      </div>
    );
  }

  return (
    <div className="component-health-id-dropdown">
      <h2 className="component-health-id-dropdown-title">User Health IDs</h2>
      <p className="component-health-id-dropdown-subtitle">Select a user from the dropdown</p>
      
      <div className="component-health-id-dropdown-container">
        <div 
          className={`component-health-id-dropdown-header ${isOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          {selectedId ? (
            <div className="component-health-id-dropdown-selected">
              <span className="component-health-id-dropdown-id">{selectedId}</span>
              {healthIds.find(user => user.id === selectedId)?.name && (
                <span className="component-health-id-dropdown-name">
                  {healthIds.find(user => user.id === selectedId).name}
                </span>
              )}
            </div>
          ) : (
            <span className="component-health-id-dropdown-placeholder">Select a health ID</span>
          )}
          <svg 
            className={`component-health-id-dropdown-arrow ${isOpen ? 'open' : ''}`} 
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
                className={`component-health-id-dropdown-item ${selectedId === user.id ? 'selected' : ''}`}
                onClick={() => handleSelect(user.id)}
              >
                <span className="component-health-id-dropdown-item-id">{user.id}</span>
                <span className="component-health-id-dropdown-item-name">{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedId && (
        <div className="component-health-id-dropdown-selection-info">
          <p>Currently selected: <strong>{selectedId}</strong></p>
          {healthIds.find(user => user.id === selectedId)?.name && (
            <p>User: <strong>{healthIds.find(user => user.id === selectedId).name}</strong></p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentHealthIdDropdown;