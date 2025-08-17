import React, { useState } from "react";
import HealthSummary from "./HealthSummary/HealthSummary";
import DashboardSection from "./DashboardSection/DashboardSection";
import { healthData, COLORS } from "../../../data/healthData";
import "./OverviewView.css";

function OverviewView() {
	const [expandedSection, setExpandedSection] = useState(null);

	const toggleSection = (section) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	return (
		<div className="overview-view">
			<HealthSummary />
      
			<div className="dashboard-sections">
				{healthData.overview.categories.map((category, idx) => (
					<DashboardSection
						key={idx}
						category={category}
						isExpanded={expandedSection === category.section}
						onToggle={() => toggleSection(category.section)}
						colors={COLORS}
					/>
				))}
			</div>
		</div>
	);
}


export default OverviewView;
