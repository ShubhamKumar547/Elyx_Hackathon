import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './PersonaDetails.css';

const PersonaDetails = () => {
  const [personaData, setPersonaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data/personaDetails`);
        const data = await res.json();
        if (data.success) {
          setPersonaData(data.data);
        } else {
          setError('Failed to fetch persona details');
        }
      } catch (err) {
        setError(err.message || 'Error fetching persona details');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="persona-details-loading">
        <div className="persona-details-spinner"></div>
        <p>Loading persona details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="persona-details-error">Error: {error}</div>;
  }

  if (!personaData) {
    return <div className="persona-details-empty">No data available</div>;
  }

  const { healthJourney } = personaData;

  return (
    <div className="persona-details-container">
      <header className="persona-details-header">
        <h1 className="persona-details-title">{healthJourney.member}'s Health Journey</h1>
        <div className="persona-details-summary">
          <h2>Summary Metrics</h2>
          <p><strong>Wellness Score Improvement:</strong> {healthJourney.summaryMetrics.wellnessScoreImprovement}</p>
          <div className="persona-details-achievements">
            <h3>Key Achievements:</h3>
            <ul>
              {healthJourney.summaryMetrics.keyAchievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="persona-details-timeline">
        <h2 className="persona-details-timeline-title">Health Journey Timeline</h2>
        {healthJourney.timeline.map((episode) => (
          <div key={episode.episode} className="persona-details-episode">
            <div className="persona-details-episode-header">
              <span className="persona-details-episode-number">Episode {episode.episode}</span>
              <h3 className="persona-details-episode-title">{episode.title}</h3>
              <span className="persona-details-episode-period">{episode.timePeriod}</span>
            </div>

            <div className="persona-details-episode-content">
              <div className="persona-details-episode-section">
                <h4>Primary Goal</h4>
                <p>{episode.primaryGoal}</p>
              </div>

              <div className="persona-details-episode-section">
                <h4>Triggered By</h4>
                <p>{Array.isArray(episode.triggeredBy) ? episode.triggeredBy.join(', ') : episode.triggeredBy}</p>
              </div>

              {episode.frictionPoints && (
                <div className="persona-details-episode-section">
                  <h4>Friction Points</h4>
                  {Array.isArray(episode.frictionPoints) ? (
                    <ul>
                      {episode.frictionPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{episode.frictionPoints}</p>
                  )}
                </div>
              )}

              <div className="persona-details-episode-section">
                <h4>Key Events</h4>
                <ul>
                  {episode.keyEvents.map((event, i) => (
                    <li key={i}>{event}</li>
                  ))}
                </ul>
              </div>

              <div className="persona-details-episode-section">
                <h4>Outcomes</h4>
                {Object.entries(episode.outcomes).map(([category, items]) => (
                  <div key={category} className="persona-details-outcome-category">
                    <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                    <ul>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="persona-details-episode-section">
                <h4>Persona Evolution</h4>
                <div className="persona-details-evolution">
                  <div>
                    <h5>Before</h5>
                    <p>{episode.personaEvolution.before}</p>
                  </div>
                  <div>
                    <h5>After</h5>
                    <p>{episode.personaEvolution.after}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaDetails;