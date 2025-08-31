import React, { useState } from "react";
import axios from 'axios';

const Navbar = () => {
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/ai/random");
      console.log("API Response:", response.data);
      // Set problems array from numberedItems
      setProblems(response.data.numberedItems || []);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <nav className="flex items-center justify-between w-full px-6 py-3 bg-white shadow-md">
        <div className="flex-1 flex justify-center items-center gap-4">
          <input
            className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Search problems..."
          />
          <button 
            onClick={handleClick} 
            disabled={loading}
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Random 5'}
          </button>
        </div>

        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <span className="text-gray-700 text-lg font-semibold">U</span>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-20 right-6 bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden z-50 border">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Random Problems</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {problems.length > 0 ? (
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{problem}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No problems loaded yet.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Close
            </button>
            <button
              onClick={handleClick}
              disabled={loading}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Get New Problems'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
