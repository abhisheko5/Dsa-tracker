import React,{useEffect,useState} from 'react';
import {LineChart,Line,CartesianGrid,XAxis,YAxis,Legend,Tooltip,ResponsiveContainer} from 'recharts';
import axios from 'axios';

const MyChart = () => {

  const[data, setData] = useState([]);

  useEffect(()=>{
    const getProgressData = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/stats/getstatsbytopic');
        console.log("response",response);
       
      if (response.data && response.data.success) {
        const dataObj = response.data.data; // this is an object: { "two pointer": 10, ... }

        // Convert object to array suitable for recharts:
        const formattedData = Object.entries(dataObj).map(([name, amt]) => ({
          name,
          amt,
        }));

        setData(formattedData);
      } else {
        console.error("API error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    } 
    
}
    getProgressData();
},[])


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

    <div className="text-blue-500 w-full">
      <MyChart/>
      
    </div>
  )

}

export default Progressbar;