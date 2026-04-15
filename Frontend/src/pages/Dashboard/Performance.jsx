import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const subjectScores = [
  { subject: "Data Analysis", score: 82 },
  { subject: "SQL", score: 75 },
  { subject: "Machine Learning", score: 68 },
  { subject: "Python", score: 80 },
  { subject: "Business Communication", score: 72 },
];

const predictedGrowth = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 82 },
  { month: "May", score: 86 },
];

const skillRadar = [
  { skill: "Problem Solving", level: 85 },
  { skill: "Communication", level: 70 },
  { skill: "Teamwork", level: 78 },
  { skill: "Creativity", level: 63 },
  { skill: "Tech Adaptability", level: 88 },
];

const competitions = [
  { name: "Kaggle Beginner Hack", result: "Top 20%" },
  { name: "Data Analytics Case Challenge", result: "Top 10%" },
  { name: "SQL Speedrun Competition", result: "Rank #27" },
];

export default function Performance() {
  return (
    <div className="p-6 flex flex-col gap-6 w-full overflow-y-auto">
      {/* Subject-wise Performance */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-[#2563EB]">
          Subject-wise Performance
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={subjectScores}>
            <XAxis dataKey="subject" />
            <Tooltip />
            <Bar dataKey="score" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-3">
          You are **strong** in <b>Data Analysis & Python</b>. You may need
          improvement in <b>Machine Learning</b>.
        </p>
      </div>

      {/* Predicted Growth */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-[#2563EB]">
          Predicted Growth (Next 5 Months)
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={predictedGrowth}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4F46E5"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-3">
          Your learning curve shows **steady improvement**. If you maintain
          consistency, you are projected to reach a strong professional skill
          level soon.
        </p>
      </div>

      {/* Skill Radar Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-[#2563EB]">
          Strength / Weakness Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={skillRadar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <Radar
              dataKey="level"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-3">
          Strength Area: <b>Problem Solving & Adaptability</b>
          Needs Practice: <b>Creativity & Communication</b>
        </p>
      </div>

      {/* Competitions & Achievements */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-[#2563EB]">
          Past Competition Performance
        </h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          {competitions.map((comp, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>{comp.name}</span>
              <span className="font-medium text-[#2563EB]">{comp.result}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 mt-3">
          You have shown **consistent performance** in competitive settings,
          proving readiness for real-world challenges.
        </p>
      </div>
    </div>
  );
}
