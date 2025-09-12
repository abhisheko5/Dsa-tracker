import React, { useState } from 'react';
import axios from 'axios';
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
  AiOutlineFileText,
  AiOutlineMenu
} from 'react-icons/ai';

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <AiOutlineHome />, path: '/home' },
    { name: 'Problems', icon: <AiOutlineBook />, path: '/Problem' },
    { name: 'Revision', icon: <AiOutlineRise />, path: '/revision' },
    { name: 'Add Problem', icon: <AiOutlinePlusCircle />, path: '/add-problem' },
    { name: 'Recent Problems', icon: <AiOutlineHistory />, path: '/recent' },
    { name: 'Chat with AI', icon: <AiOutlineRobot />, path: '/chat-with-ai' },
    { name: 'Notes', icon: <AiOutlineFileText />, path: '/notes' },
    { name: 'Roadmap', icon: <AiOutlineFileText />, path: '/roadmap' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl h-screen p-4 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <div>
          <div className="flex justify-between items-center mb-6">
            {isOpen && <h2 className="text-2xl font-bold text-[#03045e]">DSA Tracker</h2>}
            <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
              <AiOutlineMenu />
            </button>
          </div>

          <ul className="space-y-3">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => item.path && navigate(item.path)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-red-700 py-2 rounded-lg transition-colors text-white font-semibold"
          >
            <AiOutlineLogout />
            {isOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className={`flex-1 transition-all duration-300 p-6 ${isOpen ? 'ml-0' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
