import React from "react";
import "./TrendsInsights.css";

function TrendsInsights({ activeTrendTab }) {
	return (
		<div className="trends-insights">
			<h4>Key Insights</h4>
			<div className="insights-grid">
									<div className="insight-card">
										<div className="insight-header">
											<span className="insight-icon">📈</span>
											<h5>Consistent Improvement</h5>
										</div>
										<p>
											Your health score has increased by <strong>16 points</strong> over the last {activeTrendTab === "monthly" ? "6 months" : "4 weeks"}, showing consistent positive trend.
										</p>
									</div>

				<div className="insight-card">
					<div className="insight-header">
						<span className="insight-icon">❤️</span>
						<h5>Cardiovascular Progress</h5>
					</div>
					<p>
						Cardiovascular metrics show the most rapid improvement
						(+18%), likely due to your increased exercise regimen.
					</p>
				</div>

				<div className="insight-card">
					<div className="insight-header">
						<span className="insight-icon">🍽️</span>
						<h5>Dietary Impact</h5>
					</div>
					<p>
						Metabolic markers stabilized after your dietary changes in
						{activeTrendTab === "monthly" ? " March" : " Week 2"}.
					</p>
				</div>

				<div className="insight-card">
					<div className="insight-header">
						<span className="insight-icon">🎯</span>
						<h5>Projection</h5>
					</div>
					<p>
						At current trajectory, you'll reach your{" "}
						<strong>90+ goal</strong> in
						{activeTrendTab === "monthly" ? " 3 months" : " 2 weeks"}.
					</p>
				</div>
			</div>
		</div>
	);
}

export default TrendsInsights;
