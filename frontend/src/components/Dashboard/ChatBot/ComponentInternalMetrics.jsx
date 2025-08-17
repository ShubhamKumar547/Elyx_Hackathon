import React, { useState, useEffect } from "react";
import "./ComponentInternalMetrics.css";

const ComponentInternalMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData = {
          Physician_Hours: {
            Jan_2026: 6.33,
            Feb_2026: 6.33,
            Mar_2026: 6.33,
            Apr_2026: 1.5,
            May_2026: 1.5,
            Jun_2026: 4.2,
            Jul_2026: 3.0,
            Aug_2026: 3.1,
          },
          Coach_PT_Hours: {
            Jan_2026: 7.0,
            Feb_2026: 7.0,
            Mar_2026: 7.0,
            Apr_2026: 2.2,
            May_2026: 2.2,
            Jun_2026: 6.0,
            Jul_2026: 5.2,
            Aug_2026: 5.6,
          },
          Concierge_Hours: {
            Jan_2026: null,
            Feb_2026: null,
            Mar_2026: null,
            Apr_2026: 1.5,
            May_2026: 1.5,
            Jun_2026: 5.1,
            Jul_2026: 5.5,
            Aug_2026: 5.0,
          },
        };

        setMetrics(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="component-internal-metrics loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-internal-metrics error">
        <p>Error loading metrics: {error}</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="component-internal-metrics no-data">
        <p>No metrics data available</p>
      </div>
    );
  }

  // Extract all unique months from the data
  const allMonths = new Set();
  Object.values(metrics).forEach((metric) => {
    Object.keys(metric).forEach((month) => allMonths.add(month));
  });
  const sortedMonths = Array.from(allMonths).sort((a, b) => {
    return new Date(a.replace("_", " 1, ")) - new Date(b.replace("_", " 1, "));
  });

  const formatMetricName = (name) => {
    return name.replace(/_/g, " ").replace("PT", "PT ");
  };

  // Calculate monthly averages
  const calculateMonthlyAverages = () => {
    const averages = {};
    sortedMonths.forEach((month) => {
      let sum = 0;
      let count = 0;
      Object.values(metrics).forEach((metric) => {
        if (metric[month] !== null) {
          sum += metric[month];
          count++;
        }
      });
      averages[month] = count > 0 ? (sum / count).toFixed(2) : "-";
    });
    return averages;
  };

  const monthlyAverages = calculateMonthlyAverages();

  return (
    <div className="component-internal-metrics">
      <h2 className="component-internal-metrics-title">
        Internal Metrics Dashboard
      </h2>

      <div className="metrics-table-container">
        <div className="metrics-table">
          {/* Header Row */}
          <div className="metrics-row header">
            <div className="metrics-cell metric-name">Metric</div>
            {sortedMonths.map((month) => (
              <div key={month} className="metrics-cell month-header">
                {month.replace("_", " ")}
              </div>
            ))}
            <div className="metrics-cell average-header">Average</div>
          </div>

          {/* Data Rows */}
          {Object.entries(metrics).map(([metricName, monthlyData]) => {
            const values = Object.values(monthlyData).filter(
              (val) => val !== null
            );
            const average =
              values.length > 0
                ? (
                    values.reduce((sum, val) => sum + val, 0) / values.length
                  ).toFixed(2)
                : "-";

            return (
              <div key={metricName} className="metrics-row data-row">
                <div className="metrics-cell metric-name">
                  {formatMetricName(metricName)}
                </div>
                {sortedMonths.map((month) => (
                  <div key={`${metricName}-${month}`} className="metrics-cell">
                    {monthlyData[month] !== null ? monthlyData[month] : "-"}
                  </div>
                ))}
                <div className="metrics-cell average-cell">{average}</div>
              </div>
            );
          })}

          {/* Monthly Averages Row */}
          <div className="metrics-row average-row">
            <div className="metrics-cell average-label">Monthly Avg</div>
            {sortedMonths.map((month) => (
              <div key={`avg-${month}`} className="metrics-cell">
                {monthlyAverages[month]}
              </div>
            ))}
            <div className="metrics-cell total-average">-</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="metrics-charts">
        {Object.entries(metrics).map(([metricName, monthlyData]) => {
          // Find max value for scaling
          const values = Object.values(monthlyData).filter(
            (val) => val !== null
          );
          const maxValue = Math.max(...values, 10); // Ensure minimum scale of 10

          return (
            <div key={`chart-${metricName}`} className="metric-chart">
              <h3>{formatMetricName(metricName)}</h3>
              <div className="chart-bars">
                {sortedMonths.map((month) => {
                  const value = monthlyData[month];
                  if (value === null) {
                    return (
                      <div
                        key={`bar-${metricName}-${month}`}
                        className="chart-bar-container"
                      >
                        <div
                          className="chart-bar"
                          style={{ height: "0%", visibility: "hidden" }}
                        ></div>
                        <div className="chart-bar-label">
                          {month.split("_")[0]}
                        </div>
                        <div className="chart-bar-value">-</div>
                      </div>
                    );
                  }

                  const height = Math.min(100, (value / maxValue) * 100);
                  return (
                    <div
                      key={`bar-${metricName}-${month}`}
                      className="chart-bar-container"
                    >
                      <div
                        className="chart-bar"
                        style={{ height: `${height}%` }}
                        title={`${month.replace("_", " ")}: ${value}`}
                      ></div>
                      <div className="chart-bar-label">
                        {month.split("_")[0]}
                      </div>
                      <div className="chart-bar-value">{value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentInternalMetrics;
