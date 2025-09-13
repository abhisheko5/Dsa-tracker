import { PieChart, Pie, Cell, Label } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

const COLORS = ["#03045e", "#e5e7eb"]; // green = solved, gray = unsolved

export default function RingChart() {
  const [stats, setStats] = useState([]);
  const [totals, setTotals] = useState({ solved: 0, total: 0 });

  useEffect(() => {
    const getstats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stats/getstats`,{ withCredentials: true });
        console.log("API Response:", response.data);

        const solved = response.data.data.solved ?? 0;
        const unsolved = response.data.data.unsolved ?? 0;
        const total = solved + unsolved;

        setTotals({ solved, total });

        setStats([
          { name: "Solved", value: solved },
          { name: "Unsolved", value: unsolved },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    getstats();
  }, []);



  return (

        <div className="flex flex-col items-center">

    <PieChart width={200} height={200}>
      <Pie
        data={stats}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={90}
        paddingAngle={2}
        dataKey="value"
         startAngle={180} 
        endAngle={-180}    
      >
      
        {stats.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
        {/* Center text */}
        <Label
          value={`${totals.solved} / ${totals.total}`}
          solved={'Solved'}
          position="center"
          style={{ fontSize: "16px", fontWeight: "600", fill: "#374151" }}
        />
      </Pie>
    </PieChart>

    <div className="flex gap-4 justify-end   ">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#03045e]"></span>
          <span className="text-sm text-gray-700">Solved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-300"></span>
          <span className="text-sm text-gray-700">Unsolved</span>
        </div>
      </div>
    </div>
  );
}