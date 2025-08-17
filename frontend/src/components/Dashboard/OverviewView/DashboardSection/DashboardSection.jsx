import React from "react";
import { COLORS } from "../../../data/healthData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./DashboardSection.css";

function DashboardSection({ category, isExpanded, onToggle }) {
  const renderTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span className="trend-up">↑</span>;
      case "down":
        return <span className="trend-down">↓</span>;
      default:
        return <span className="trend-stable">→</span>;
    }
  };

  const averageScore = (
    category.items.reduce((sum, item) => sum + item.value, 0) /
    category.items.length
  ).toFixed(1);

  return (
    <div className="dashboard-section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-title">
          <span className="section-icon">{category.icon}</span>
          <h2>{category.section}</h2>
        </div>
        <div className="section-summary">
          <span className="section-score">{averageScore}</span>
          <span className="toggle-icon">{isExpanded ? "−" : "+"}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="section-content">
          <div className="section-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={category.items}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: COLORS[3],
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {category.items.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="metrics-details">
            <h4>Detailed Metrics</h4>
            <ul className="metrics-list">
              {category.items.map((item, i) => {
                // Use the same color index calculation for both chart and metrics
                const colorIndex = i % COLORS.length;
                const itemColor = COLORS[colorIndex];

                return (
                  <li key={i} className="metric-item">
                    <div className="metric-info">
                      <span className="metric-name">{item.name}</span>
                      <span className="metric-value">
                        {item.value}
                        <span className="metric-unit">/100</span>
                      </span>
                    </div>
                    <div className="metric-trend">
                      {renderTrendIcon(item.trend)}
                      <div
                        className="metric-bar"
                        style={{
                          width: `${item.value}%`,
                          background: itemColor,
                        }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardSection;
