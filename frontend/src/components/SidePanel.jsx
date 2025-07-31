import React from 'react';

function Sidebar(){
  return(
  <div className="w-64 h-screen shadow-lg  bg-gray-800  p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-3">
        <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
        <li className="hover:bg-gray-700 p-2 rounded">Calendar</li>
        <li className="hover:bg-gray-700 p-2 rounded">recent problems</li>
        <li className="hover:bg-gray-700 p-2 rounded">⚙️ Settings</li>
      </ul>
    </div>
  )
}

export default Sidebar;



