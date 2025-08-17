import React, { useState } from "react";
import BiomarkersAnalysis from "./BiomarkersAnalysis/BiomarkersAnalysis";
import HealthDistribution from "./HealthDistribution/HealthDistribution";
import "./AnalyticsView.css";

function AnalyticsView() {
	const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("biomarkers");

	return (
		<div className="analytics-view">
			<div className="analytics-subtabs">
				<button
					className={`subtab-btn ${
						activeAnalyticsTab === "biomarkers" ? "active" : ""
					}`}
					onClick={() => setActiveAnalyticsTab("biomarkers")}
				>
					Biomarkers
				</button>
				<button
					className={`subtab-btn ${
						activeAnalyticsTab === "distribution" ? "active" : ""
					}`}
					onClick={() => setActiveAnalyticsTab("distribution")}
				>
					Category Distribution
				</button>
			</div>

								<div className="analytics-content">
									{activeAnalyticsTab === "biomarkers" ? <BiomarkersAnalysis /> : <HealthDistribution />}
								</div>
		</div>
	);
}

export default AnalyticsView;
