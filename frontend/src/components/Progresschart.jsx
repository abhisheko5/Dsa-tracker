import React from 'react';
import {LineChart,Line,CartesianGrid,XAxis,YAxis,Legend,Tooltip,ResponsiveContainer} from 'recharts';

const data=[{name:'two pointer',uv:400, pv:2400, amt:10},
  {name:'sliding window',uv:400, pv:2400, amt:20},
  {name:'binary',uv:400, pv:2400, amt:4},
  {name:'queue',uv:400, pv:2400, amt:7},
  {name:'stack',uv:400, pv:2400, amt:6},
  {name:'recursion',uv:400, pv:2400, amt:13}


];


const MyChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}
          labelStyle={{ color: '#6b7280', fontWeight: 'bold' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="amt"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
          activeDot={{ r: 8 }}
          name="Problems Solved"
          isAnimationActive={true}
animationDuration={1000}

        />
      </LineChart>
    </ResponsiveContainer>

  );
}

function Progressbar(){
  return(

    <div className="text-blue-500">
      <MyChart/>
      
    </div>
  )

}

export default Progressbar;