
import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from "recharts";
import { Category } from "@/contexts/MiqContext";

interface ResultsChartProps {
  categories: Category[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ categories }) => {
  const chartData = categories
    .filter((cat) => cat.score !== null)
    .map((cat) => ({
      subject: cat.name,
      score: cat.score,
      fullMark: 5,
    }));

  return (
    <div className="w-full h-96">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar
              name="MIQ Score"
              dataKey="score"
              stroke="#168A9C"
              fill="#168A9C"
              fillOpacity={0.6}
            />
            <Tooltip formatter={(value) => [`${value.toFixed(1)}/5`, "Score"]} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">Complete at least one category to view results</p>
        </div>
      )}
    </div>
  );
};

export default ResultsChart;
