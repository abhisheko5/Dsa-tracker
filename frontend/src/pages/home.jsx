import React from "react";
import Sidebar from "../components/SidePanel.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Progressbar from "../components/progresschart.jsx";
import DifficultyStat from '../components/DifficultyStat.jsx';
import CalendarCard from '../components/Calendar.jsx';
import RecentProblems from '../components/Recentproblems.jsx';
import TotalProgress from '../components/TotalProgress.jsx';
import Chatbot from '../components/Chatbot.jsx';


const Home=()=>{
  return(
    <div className=" flex h-screen ">

      <div className="flex flex-col flex-1 bg-gray-100">
        <Navbar />
        <div className="grid grid-cols-3 grid-rows-2 gap-6 p-8 items-stretch min-h-[calc(100vh-64px)]">
          {/* Donut Chart Card */}
          <Card className="flex items-center justify-center h-[220px] shadow-lg bg-white"> 
            <Donutbar />
          </Card>

          {/* Difficulty and Quote */}
          <div className="flex flex-col gap-6 h-full">
            <Card className="flex items-center p-4 h-[80px] bg-white shadow-md">
              <DifficultyStat />
            </Card>
            <Card className="flex flex-col items-center justify-center p-4 h-[120px] bg-white shadow-md">
              <h1 className="text-xl font-bold text-gray-700 text-center">“Consistency is what transforms average into excellence.”</h1>
              <p className="text-sm text-gray-500 mt-2 text-center">— Anonymous</p>
            </Card>
          </div>
          

          {/* Calendar Card */}
          <Card className="flex flex-col items-center justify-start h-[270px] shadow-lg bg-white"> 
           <RecentProblems />

          </Card>

          


          
          <Card className="col-span-2 p-4  shadow-lg flex items-center justify-center">
            <Progressbar />
          </Card>
          <Card className="flex-1 flex items-center justify-center">
            <TotalChart />
            </Card>

          {/* Progress Bar Card - spans 2 columns */}
          
        </div>
      </div>
      <Chatbot />
    </div>

      )    
}

export default Home;
