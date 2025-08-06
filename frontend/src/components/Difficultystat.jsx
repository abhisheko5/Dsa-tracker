import React from 'react';

const DifficultyStat = () => {
  const difficultyData = {
    easy: 42,
    medium: 28,
    hard: 8,
  };

  const colorMap = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500',
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
