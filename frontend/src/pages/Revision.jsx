
import React from "react";
import Card from "../components/Card.jsx";
import Navbar from "../components/Navbar.jsx";

const Revision = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <Card className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Revision Dashboard</h1>
          <p className="text-gray-600 text-center mb-4">Review and practice problems you've marked for revision. Stay consistent and track your progress!</p>
        </Card>
        <Card className="w-full max-w-3xl p-6 bg-gradient-to-r from-indigo-100 to-purple-100 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Problems for Revision</h2>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">No</th>
                <th className="px-4 py-2 text-left text-gray-700">Title</th>
                <th className="px-4 py-2 text-left text-gray-700">Last Attempt</th>
                <th className="px-4 py-2 text-left text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with dynamic data */}
              <tr>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Two Sum</td>
                <td className="px-4 py-2">2025-08-01</td>
                <td className="px-4 py-2">Pending</td>
                <td className="px-4 py-2">
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition">Revise</button>
                </td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Revision;
