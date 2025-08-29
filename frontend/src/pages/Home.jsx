import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidePanel.jsx";
import Navbar from "../components/Navbar.jsx";
import axios from 'axios';
import Card from "../components/Card.jsx";
import Progressbar from "../components/progresschart.jsx";
import RingChart from "../components/RingChart.jsx";
import DifficultyStat from '../components/DifficultyStat';
import CalendarCard from '../components/Calendar';
import RecentProblems from '../components/Recentproblems.jsx';
import TotalProgress from '../components/TotalProgress.jsx';
import Chatbot from '../components/Chatbot.jsx';
import TotalChart from '../components/RadarChart.jsx';
import WeakTopicsChart from '../components/TopicWiseGraph'

const Home = () => {
  const [recentProblems, setRecentProblems] = useState([]);

  useEffect(() => {
    const fetchRecentProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/status/recentproblems");
        setRecentProblems(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching recent problems:", error);
      }
    };

    fetchRecentProblems();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 bg-gray-100">
        <Navbar />
        <div className="grid grid-cols-6 gap-6 p-8 min-h-[calc(100vh-64px)] overflow-auto">
  
          <Card className="col-span-2 flex items-center justify-center h-[290px] shadow-lg bg-white"> 
            <RingChart />
          </Card>

          <div className="col-span-2 flex flex-col gap-5 h-full">
            <Card className="flex items-center p-4 h-[100px] bg-white shadow-md">
              <DifficultyStat />
            </Card>
            <Card className="flex flex-col items-center justify-center p-4 h-[170px] bg-white shadow-md">
              <h1 className="text-xl font-bold text-gray-700 text-center">
                "Consistency is what transforms average into excellence."
              </h1>
              <p className="text-sm text-gray-500 mt-2 text-center">— Anonymous</p>
            </Card>
          </div>
            
            


          <div className="col-span-2 flex flex-col gap-4">
            <Card className="flex flex-col items-center justify-start h-[290px] shadow-lg bg-white"> 
              <CalendarCard />
            </Card>
           
          </div>

          <div className="col-span-4 flex flex-col">
            <Card className="flex flex-col items-center justify-start h-[350px] shadow-lg bg-white">
            <WeakTopicsChart/>
            </Card>
          </div>
          <div className="col-span-2">
            <Card className="flex flex-col items-center justify-start h-[350px] shadow-lg bg-white">
            <RecentProblems recentProblems={recentProblems}/>
            </Card>
          </div>

  
          <div className="col-span-6">
            <Card className="p-4 shadow-lg bg-white overflow-hidden">
              <Progressbar />
            </Card>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default Home;