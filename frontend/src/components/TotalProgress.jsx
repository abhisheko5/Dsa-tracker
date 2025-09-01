import React, { useState, useEffect } from "react";
import api from "../api/axios";


const TotalProgress=()=> {

const [totalProblems, setTotalProblems] = useState(0);
const [solvedProblems, setSolvedProblems] = useState(0);

useEffect(() => {
const fetchTotalProgress = async () => {
try{
  const response = await api.get('/api/status/progress');
  console.log("Total Progress Response:", response.data);
  if (response.data && response.data.success) {
    setTotalProblems(response.data.data.totalProblems || 0);
    setSolvedProblems(response.data.data.solvedProblems || 0);
  } else {
    console.error("API error:", response.data.message);
  }
} catch (error) {
  console.error("Error fetching total progress:", error);}
}
fetchTotalProgress();
},[]);

return(


  <div className="w-full h-full flex flex-col items-center justify-start p-2">
    <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">Total Progress</h2>
    <div className="w-full flex justify-between items-center">
      <div className="text-gray-800">
         {totalProblems}
      </div>
      <div className="text-gray-800">
        <span className="font-semibold">Solved Problems:</span> {solvedProblems}
      </div>
    </div>
  </div>
);

}
export default TotalProgress;