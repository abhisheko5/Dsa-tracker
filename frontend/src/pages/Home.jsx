import react from "react";
import Sidebar from "../components/SidePanel.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Progressbar from "../components/Progresschart.jsx";
import Donutbar from "../components/Piecharts.jsx";
import DifficultyStat from '../components/DifficultyStat';
import CalendarCard from '../components/Calendar';


const Home=()=>{
  return(
    <div className=" flex h-screen ">
      <Sidebar/>
      <div className=" flex flex-col flex-1 bg-gray-100">
        <Navbar/>
        <div className="grid grid-cols-3 gap-4 p-5 items-stretch">
        <Card className=" w-75 h-[220px]"> <Donutbar/></Card>
        <div className="flex flex-col gap-4">
  <Card className="p-2 h-[80px]  bg-white">
    <DifficultyStat />
  </Card>

  <Card className="p-2 text-center h-30 ">
    <h1 className="text-xl font-bold text-gray-700">“Consistency is what transforms average into excellence.”</h1>
    <p className="text-sm text-gray-500 mt-1">— Anonymous</p>
  </Card>
</div>
        
 
        <Card className="rounded-xl shadow-md bg-gradient-to-br from-white to-blue-50 w-full h-full
"><CalendarCard /></Card>

        <Card className=" mt-5 col-span-2 p-2 h-auto bg-gradient-to-r from-indigo-100 to-purple-100
"> <Progressbar/></Card> 
        </div>
      </div>

    </div>

      )    
}

export default Home;