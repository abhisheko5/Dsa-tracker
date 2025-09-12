import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList,Cell
} from "recharts";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeakTopicsChart() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stats/getstatsbytopic",{ withCredentials: true });
        let sortedData = response.data.data.sort((a, b) => a.solved - b.solved); // weakest first
        setTopics(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    getProblems();
  }, []);

  // colors for bars (looped if more topics come in)
  const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Weak Topics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="topic" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          <Bar 
            dataKey="solved" 
            radius={[8, 8, 0, 0]}
            label={{ position: "top", fill: "#374151", fontSize: 12 }}
          >
            {topics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}