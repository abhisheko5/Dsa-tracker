
import React, { useState } from "react";
import Card from "../components/Card.jsx";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <Card className="w-full max-w-xl p-8 bg-white shadow-lg rounded-xl mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">Settings</h1>
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-indigo-600">U</div>
            <div>
              <div className="font-semibold text-lg text-gray-700">Username</div>
              <div className="text-gray-500 text-sm">user@email.com</div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Dark Mode</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${darkMode ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Notifications</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
              onClick={() => setNotifications((prev) => !prev)}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${notifications ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Save Changes</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;

