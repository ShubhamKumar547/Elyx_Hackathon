import React from "react";
import {
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { healthData, COLORS } from "../../../../data/healthData";
import "./BiomarkersAnalysis.css";

function BiomarkersAnalysis() {
	return (
		<div className="analytics-card">
			<h3>Biomarker Analysis</h3>
			<div className="chart-container">
				<ResponsiveContainer width="100%" height={400}>
					<RadarChart
						outerRadius={150}
						data={healthData.analytics.biomarkers}
						margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
					>
						<PolarGrid radialLines={false} />
						<PolarAngleAxis
							dataKey="name"
							tick={{ fill: COLORS[0], fontSize: 12 }}
						/>
						<PolarRadiusAxis
							angle={30}
							domain={[0, 250]}
							tickCount={6}
							tick={{ fill: COLORS[1], fontSize: 10 }}
						/>
						<Radar
							name="Your Values"
							dataKey="value"
							stroke={COLORS[0]}
							fill={COLORS[0]}
							fillOpacity={0.4}
							animationDuration={1500}
						/>
						<Radar
							name="Optimal"
							dataKey="optimal"
							stroke={COLORS[2]}
							fill={COLORS[2]}
							fillOpacity={0.1}
							animationDuration={2000}
						/>
						<Tooltip
							contentStyle={{
								background: "rgba(255, 255, 255, 0.96)",
								borderRadius: "8px",
								boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
								border: "none",
							}}
						/>
						<Legend
							wrapperStyle={{
								paddingTop: "20px",
							}}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>

			<div className="biomarkers-table">
				<h4>Biomarker Details</h4>
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th>Biomarker</th>
								<th>Your Value</th>
								<th>Optimal Range</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{healthData.analytics.biomarkers.map((bio, i) => (
								<tr key={i}>
									<td>{bio.name}</td>
									<td>
										<strong>{bio.value}</strong> {bio.unit}
									</td>
									<td>
										{bio.name === "BMI"
											? `${bio.optimal - 5}-${bio.optimal}`
											: `< ${bio.optimal}`} {bio.unit}
									</td>
									<td>
										<span
											className={`status-badge ${
												bio.value < bio.optimal ? "good" : "warning"
											}`}
										>
											{bio.value < bio.optimal ? "Normal" : "High"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default BiomarkersAnalysis;
