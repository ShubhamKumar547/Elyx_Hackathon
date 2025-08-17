import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./TrendsView.css";

const COLORS = [
  "#2193b0",
  "#82ca9d",
  "#ffc658",
  "#6a5acd",
  "#ff6f61",
  "#4682b4",
];

function TrendView() {
  const [wellnessData, setWellnessData] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockWellnessData = {
          monthlyWellnessScores: [
            { month: "January 2026", score: 23.9 },
            { month: "February 2026", score: 37.4 },
            { month: "March 2026", score: 51.3 },
            { month: "April 2026", score: 50.3 },
            { month: "May 2026", score: 46.5 },
            { month: "June 2026", score: 54.5 },
            { month: "July 2026", score: 64.4 },
            { month: "August 2026", score: 67.1 },
          ],
          averageScore: 49.425,
          highestScore: { month: "August 2026", score: 67.1 },
          lowestScore: { month: "January 2026", score: 23.9 },
          unit: "out of 100",
        };

        const mockDetailedData = {
          VO2max_Garmin: {
            Jan_2026: 48,
            Feb_2026: 50,
            Mar_2026: 50,
            Apr_2026: 51,
            May_2026: 50,
            Jun_2026: 51,
            Jul_2026: 51,
            Aug_2026: 51,
          },
          Cholesterol_ApoB_mg_dL: {
            Jan_2026: 118.0,
            Feb_2026: 113.0,
            Mar_2026: 108.0,
            Apr_2026: 102.0,
            May_2026: 101.5,
            Jun_2026: 101.0,
            Jul_2026: 97.0,
            Aug_2026: 97.0,
          },
          Blood_Pressure_Avg_mmHg: {
            Jan_2026: "128/84",
            Feb_2026: "129/85",
            Mar_2026: "126/82",
            Apr_2026: "127/84",
            May_2026: "128/85",
            Jun_2026: "127/84",
            Jul_2026: "126/83",
            Aug_2026: "124/81",
          },
          Cognitive_Score_Index: {
            Jan_2026: 100,
            Feb_2026: 99,
            Mar_2026: 101,
            Apr_2026: 100,
            May_2026: 99,
            Jun_2026: 101,
            Jul_2026: 102,
            Aug_2026: 103,
          },
          Sleep_Quality_Avg_Hours: {
            Jan_2026: 5.8,
            Feb_2026: 6.2,
            Mar_2026: 6.7,
            Apr_2026: 6.3,
            May_2026: 6.1,
            Jun_2026: 6.5,
            Jul_2026: 6.8,
            Aug_2026: 6.8,
          },
          Stress_Resilience_HRV_Avg: {
            Jan_2026: 45,
            Feb_2026: 52,
            Mar_2026: 53,
            Apr_2026: 53,
            May_2026: 55,
            Jun_2026: 53,
            Jul_2026: 56,
            Aug_2026: 56,
          },
        };

        setWellnessData(mockWellnessData);
        setDetailedData(mockDetailedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMonthClick = (data) => {
    if (data && data.activePayload) {
      const month = data.activePayload[0].payload.month;
      setSelectedMonth(month);
    }
  };

  const formatMetricName = (name) => {
    return name
      .replace(/_/g, " ")
      .replace("Avg", "Average")
      .replace("mg dL", "(mg/dL)")
      .replace("mmHg", "(mmHg)")
      .replace("HRV", "HRV (ms)")
      .replace("VO2max", "VO₂ max");
  };

  const getMonthKey = (month) => {
    return month.split(" ")[0].substring(0, 3) + "_2026";
  };

  const getMetricUnit = (metricName) => {
    if (metricName.includes("VO2max")) return "ml/kg/min";
    if (metricName.includes("Cholesterol")) return "mg/dL";
    if (metricName.includes("Blood Pressure")) return "mmHg";
    if (metricName.includes("Cognitive")) return "points";
    if (metricName.includes("Sleep")) return "hours";
    if (metricName.includes("HRV")) return "ms";
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const month = label;
      const monthKey = getMonthKey(month);

      return (
        <div className="custom-tooltip" style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <p><strong>{label}</strong></p>
          <p>Wellness Score: {payload[0].value} {wellnessData.unit}</p>
          <hr />
          {Object.entries(detailedData).map(([metric, values]) => {
            const value = values[monthKey];
            return (
              <div key={metric} style={{ marginBottom: 4 }}>
                <strong>{formatMetricName(metric)}:</strong> {value !== undefined ? value : "N/A"}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="component-wellness-trends loading">
        <div className="loading-spinner"></div>
        <p>Loading wellness data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-wellness-trends error">
        <p>Error loading wellness data: {error}</p>
      </div>
    );
  }

  if (!wellnessData || !detailedData) {
    return (
      <div className="component-wellness-trends no-data">
        <p>No wellness data available</p>
      </div>
    );
  }

  return (
    <div className="component-wellness-trends">
      <div className="component-wellness-trends-header">
        <h2>Monthly Wellness Scores</h2>
        <div className="component-wellness-trends-stats">
          <div className="stat-card">
            <span className="stat-label">Average</span>
            <span className="stat-value">
              {wellnessData.averageScore.toFixed(1)}
            </span>
            <span className="stat-unit">{wellnessData.unit}</span>
          </div>
          <div className="stat-card high">
            <span className="stat-label">Highest</span>
            <span className="stat-value">
              {wellnessData.highestScore.score}
            </span>
            <span className="stat-unit">{wellnessData.highestScore.month}</span>
          </div>
          <div className="stat-card low">
            <span className="stat-label">Lowest</span>
            <span className="stat-value">{wellnessData.lowestScore.score}</span>
            <span className="stat-unit">{wellnessData.lowestScore.month}</span>
          </div>
        </div>
      </div>

      <div className="component-wellness-trends-chart">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={wellnessData.monthlyWellnessScores}
            margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
            onClick={handleMonthClick}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#7f8c8d" }}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#7f8c8d" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="score"
              stroke={COLORS[0]}
              fillOpacity={1}
              fill="url(#colorScore)"
              name="Wellness Score"
              animationDuration={1500}
              activeDot={{
                r: 8,
                fill: COLORS[0],
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {selectedMonth && (
        <div className="component-wellness-details">
          <h3>Detailed Health Metrics for {selectedMonth}</h3>
          <div className="metrics-grid">
            {Object.entries(detailedData).map(([metric, values], index) => {
              const monthKey = getMonthKey(selectedMonth);
              const value = values[monthKey];
              const unit = getMetricUnit(metric);
              return (
                <div
                  key={metric}
                  className="metric-card"
                  style={{
                    borderLeft: `4px solid ${COLORS[index % COLORS.length]}`,
                  }}
                >
                  <div className="metric-name">
                    {formatMetricName(metric)}
                    {unit && <span className="metric-unit"> ({unit})</span>}
                  </div>
                  <div className="metric-value">
                    {value !== undefined ? (
                      <>
                        {value}
                        {unit && <span className="value-unit"> {unit}</span>}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendView;
