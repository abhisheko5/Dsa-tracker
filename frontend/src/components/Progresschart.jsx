import React, { useEffect, useState } from "react";
import api from "./api/axios";  // use this instead of raw axios

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProgressData = async () => {
      try {
        const response = await api.get(
          `/api/stats/getstatsbytopic`
        );

        // ✅ Map backend data (topic → X-axis, solved → Y-axis)
        const formatted = response.data.data.map((item) => ({
          name: item.topic,
          amt: item.solved,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    getProgressData();
  }, []);

  return (
    <div className="relative w-full h-96 bg-white p-4 rounded-xl shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-indigo-700">Progress Chart</h2>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            labelStyle={{ color: "#6b7280", fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="amt"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
            name="Problems Solved"
            isAnimationActive={true}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

function Progressbar() {
  return (
    <div className="w-full">
      <MyChart />
    </div>
  );
}

export default Progressbar;
