import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AiOutlineHome, 
  AiOutlineBook, 
  AiOutlineRise, 
  AiOutlinePlusCircle, 
  AiOutlineHistory, 
  AiOutlineRobot, 
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineFileText
} from 'react-icons/ai';

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <AiOutlineHome />, path: '/home' },
    { name: 'Problems', icon: <AiOutlineBook />, path: '/Problem' },
    { name: 'Revision', icon: <AiOutlineRise />, path: '/revision' },
    { name: 'Analytics', icon: <AiOutlineRise />, path: null },
    { name: 'Add Problem', icon: <AiOutlinePlusCircle />, path: '/add-problem' },
    { name: 'Recent Problems', icon: <AiOutlineHistory />, path: '/recent' },
    { name: 'Chat with AI', icon: <AiOutlineRobot />, path: '/chat-with-ai' },
    { name: 'Settings', icon: <AiOutlineSetting />, path: '/settings' },
    {name:'Notes' ,icon:<AiOutlineFileText/>,path:'/notes'}
  ];

  return (
    <div className="w-64 h-screen shadow-xl p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">DSA Tracker</h2>
        <ul className="space-y-3">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => item.path && navigate(item.path)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200  cursor-pointer transition-all duration-200"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-red-700 py-2 rounded-lg transition-colors text-white font-semibold"
        >
          <AiOutlineLogout /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
