import React from "react";
import Sidebar from "../components/SidePanel.jsx";
import Navbar from "../components/Navbar.jsx";
import Problemtable from "../components/Problemtable.jsx";


const Problems=()=>{
  return(
    <div className=" flex h-screen ">
      <Sidebar/>
      <div className=" flex flex-col flex-1 bg-gray-100 p-5">
        <Problemtable/>
        
        </div>
        </div>
  )
}

export default Problems;