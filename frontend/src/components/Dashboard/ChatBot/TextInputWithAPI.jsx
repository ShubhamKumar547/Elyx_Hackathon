import React, { useState } from 'react';
import './TextInputWithAPI.css';

const BACKEND_URL = 'http://localhost:5000/api/pipeline/processCallsQuestions';

const TextInputWithAPI = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setApiData(null);
    
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputValue }),
      });
      if (!response.ok) throw new Error('API error');
      const result = await response.json();
      setApiData(result.data || result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render **bold** text
  const renderBoldText = (text) => {
    if (typeof text !== 'string') return text;
    // Replace **text** with <strong>text</strong>
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderResponseData = (data) => {
    if (!data) return null;
    
    if (typeof data === 'object') {
      return (
        <div className="text-input-with-api__response-grid">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-input-with-api__response-item">
              <span className="text-input-with-api__response-key">{key}:</span>
              <span className="text-input-with-api__response-value">
                {typeof value === 'object' ? JSON.stringify(value) : renderBoldText(value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    return <div className="text-input-with-api__response-text">{renderBoldText(data)}</div>;
  };

  return (
    <div className="text-input-with-api">
      <div className="text-input-with-api__header">
        <h2 className="text-input-with-api__title">Discover Information Instantly</h2>
        <p className="text-input-with-api__subtitle">
          Ask anything and get detailed responses from our knowledge base
        </p>
      </div>

      <form onSubmit={handleSubmit} className="text-input-with-api__form">
        <div className="text-input-with-api__input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="text-input-with-api__input"
            placeholder="What information are you looking for today?"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="text-input-with-api__button"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <span className="text-input-with-api__button-loading"></span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="text-input-with-api__loading">
          <div className="text-input-with-api__loading-spinner"></div>
          <p>Analyzing your request...</p>
        </div>
      )}

      {error && (
        <div className="text-input-with-api__error">
          <svg className="text-input-with-api__error-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
          </svg>
          <div className="text-input-with-api__error-content">
            <h4>We encountered an issue</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {apiData && (
        <div className="text-input-with-api__response">
          <div className="text-input-with-api__response-header">
            <svg className="text-input-with-api__response-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9,21c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-1H9V21z M12,2C8.14,2,5,5.14,5,9c0,2.38,1.19,4.47,3,5.74V17 c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1v-2.26c1.81-1.27,3-3.36,3-5.74C19,5.14,15.86,2,12,2z"/>
            </svg>
            <h3 className="text-input-with-api__response-title">Here's what we found</h3>
          </div>
          <div className="text-input-with-api__response-content">
            {renderResponseData(apiData)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInputWithAPI;