import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
const DifficultyStat = () => {

  const [difficultyData, setDifficultyData] = useState({});

  useEffect(() => {
    const fetchDifficultyData = async () => {
        
      try{
      
      const response= await axios.get('http://localhost:3000/api/stats/getstatsbydiff');
        setDifficultyData(response.data.data || {});
    
      }
  catch(error){
    console.log(error);
  }
}
  fetchDifficultyData()
},[])

  const colorMap = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500',
    Hard: 'text-red-500',
  };

  return (
    <div className="flex justify-between text-center w-full px-4">
      {Object.entries(difficultyData).map(([level, count]) => (
        <div key={level}>
          <h3 className={`font-semibold text-sm ${colorMap[level]}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </h3>
          <p className="text-lg font-bold text-gray-800">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default DifficultyStat;
