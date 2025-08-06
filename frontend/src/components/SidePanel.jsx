import React from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar(){
  const navigate = useNavigate();

  return(
  <div className="w-64 h-screen shadow-lg    p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-3">
        <li className="hover:bg-gray-200 p-2 rounded" onClick={()=>navigate("/home")}>Dashboard</li>
        <li className="hover:bg-gray-200 p-2 rounded" onClick={()=>navigate("/Problem")}>Problems</li>
        <li className="hover:bg-gray-200 p-2 rounded">Revision</li>
        <li className="hover:bg-gray-200 p-2 rounded">Analytics</li>
        <li className="hover:bg-gray-200 p-2 rounded" onClick={()=>navigate("/add-problem")}>Add problem</li>
        <li className="hover:bg-gray-200 p-2 rounded">Recent Problems</li>
        <li className="hover:bg-gray-200 p-2 rounded">Chat with ai</li>
        <li className="hover:bg-gray-200 p-2 rounded">⚙️ Settings</li>
      </ul>
    </div>
  )
}

export default Sidebar;



