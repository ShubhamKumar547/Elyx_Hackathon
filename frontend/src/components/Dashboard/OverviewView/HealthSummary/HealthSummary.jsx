import React from "react";
import { healthData } from "../../../../data/healthData";
import "./HealthSummary.css";

const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"]; // Example color palette

function HealthSummary() {
	const renderRiskTrend = (trend) => {
		switch (trend) {
			case "improving":
				return "↗ Improving";
			case "stable":
				return "→ Stable";
			default:
				return "⚠ Monitoring";
		}
	};

	return (
		<div className="health-summary">
			<div className="summary-card primary">
				<div className="score-container">
					<h3>Overall Health Score</h3>
					<div className="score-circle" style={{ background: COLORS[3] }}>
						<span>{healthData.overview.score}</span>
						<span className="trend-badge up" style={{ color: COLORS[1] }}>
							+5%
						</span>
					</div>
					<p className="score-description">
						Good • Above average for your age group
					</p>
				</div>
				<div className="score-details">
					<div className="detail-item">
						<span className="detail-label">Last Month</span>
						<span className="detail-value">79</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">6 Month Avg</span>
						<span className="detail-value">81</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Goal</span>
						<span className="detail-value">90+</span>
					</div>
				</div>
			</div>

			<div className="summary-card risk-factors">
				<h3>Risk Factors</h3>
				<ul className="risk-list">
					{healthData.overview.riskFactors.map((factor, i) => (
						<li
							key={i}
							className={`risk-item ${factor.level}`}
							style={{ color: COLORS[i % COLORS.length] }}
						>
							<span className="risk-name">{factor.name}</span>
							<span className="risk-level">{factor.level}</span>
							<span className={`risk-trend ${factor.trend}`}>
								{renderRiskTrend(factor.trend)}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default HealthSummary;
