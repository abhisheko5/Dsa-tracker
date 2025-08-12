import React,{useState,useEffect} from "react";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';




const RecentProblems = () => {

  const[recentProblems, setRecentProblems]=useState([]);

  useEffect(() => {
    const fetchRecentProblems = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/status/recentproblems')
        
        
        console.log("response", response);
        setRecentProblems(response.data?.data || []);
      }
      catch(error) {
        console.error("Error fetching recent problems:", error);
      }
    }
    fetchRecentProblems();
  },[]);
  
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-2">
      <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">Recent Problems</h2>
      <ul className="w-full divide-y divide-gray-200 overflow-y-auto">
        {recentProblems.map((problem,index) => (
          <li key={problem._id || index} className="py-2 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-800">{problem.title}</span>
              <span className="ml-2 text-xs text-gray-500">({problem.difficulty})</span>
            </div>
            <span className="text-sm text-gray-400">{problem.lastAttempted}</span>
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default RecentProblems;
