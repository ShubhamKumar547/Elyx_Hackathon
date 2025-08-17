import React from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ComposedChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Scatter,
} from "recharts";
import { healthData, COLORS } from "../../../../data/healthData";
import "./HealthDistribution.css";

function HealthDistribution() {
	return (
		<div className="analytics-card">
			<h3>Health Category Distribution</h3>
			<div className="chart-row">
				<div className="chart-container half-width">
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={healthData.analytics.distribution}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								paddingAngle={5}
								dataKey="value"
								label={({ name, percent }) =>
									`${name}: ${(percent * 100).toFixed(0)}%`
								}
								animationDuration={1500}
							>
								{healthData.analytics.distribution.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								formatter={(value) => [`Score: ${value}`, ""]}
								contentStyle={{
									background: "rgba(255, 255, 255, 0.96)",
									borderRadius: "8px",
									boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
									border: "none",
								}}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="chart-container half-width">
					<ResponsiveContainer width="100%" height={300}>
						<ComposedChart
							layout="vertical"
							data={healthData.analytics.distribution}
							margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
						>
							<CartesianGrid stroke="#f5f5f5" />
							<XAxis type="number" domain={[0, 100]} />
							<YAxis dataKey="name" type="category" />
							<Tooltip
								contentStyle={{
									background: "rgba(255, 255, 255, 0.96)",
									borderRadius: "8px",
									boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
									border: "none",
								}}
							/>
							<Bar
								dataKey="value"
								barSize={30}
								fill={COLORS[1]}
								radius={[0, 4, 4, 0]}
								animationDuration={1500}
							/>
							<Scatter dataKey="value" fill={COLORS[3]} />
						</ComposedChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}

export default HealthDistribution;
