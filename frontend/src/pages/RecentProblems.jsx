import React, { useState, useEffect } from "react";
import axios from "axios";
import RecentProblems from "../components/Recentproblems";

const RecentProblemsPage = () => {
  const [recentProblems, setRecentProblems] = useState([]);

  useEffect(() => {
    const fetchRecentProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status/recentproblems`,{ withCredentials: true});
        setRecentProblems(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching recent problems:", error);
      }
    };

    fetchRecentProblems();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center p-6">
      {recentProblems.length > 0 ? (
        <RecentProblems recentProblems={recentProblems} />
      ) : (
        <p>Loading recent problems...</p>
      )}
    </div>
  );
};

export default RecentProblemsPage;