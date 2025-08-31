import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DifficultyStat = () => {
  const [difficultyData, setDifficultyData] = useState({
    Easy: 0,
    Medium: 0,
    Hard: 0,
  });

  useEffect(() => {
    const fetchDifficultyData = async () => {
      try {
        const response = await axios.get('https://dsa-tracker-nh8t.onrender.com/api/stats/getstatsbydiff');
        // Merge with default values to ensure all levels exist
        setDifficultyData(prev => ({
          Easy: response.data.data?.Easy || 0,
          Medium: response.data.data?.Medium || 0,
          Hard: response.data.data?.Hard || 0,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDifficultyData();
  }, []);

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
            {level}
          </h3>
          <p className="text-lg font-bold text-gray-800">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default DifficultyStat;
