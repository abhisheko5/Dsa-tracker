import React from "react";
import { formatDistanceToNow } from "date-fns";

const RecentProblems = ({recentProblems}) => {

  return (
    <div className="w-full h-full flex flex-col p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#03045e]   mb-4 text-center">
        Recent Problems
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Sr</th>
              <th className="px-4 py-2 text-left">Problem no</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Difficulty</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {recentProblems.length > 0 ? (
              recentProblems.map((problem, index) => (
                <tr
                  key={problem._id || index}
                  className="hover:bg-gray-50 border-t text-sm"
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {index+1}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {problem.problemNo}
                  </td>
                  <td className="px-4 py-2 font-semibold text-indigo-600 hover:underline cursor-pointer">
                   <a
      href={problem.url}   
      target="_blank"      
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline font-semibold"
    >
      {problem.title}
    </a>
                  </td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      problem.difficulty === "Easy"
                        ? "text-green-600"
                        : problem.difficulty === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {problem.updatedAt
                      ? formatDistanceToNow(new Date(problem.updatedAt), {
                          addSuffix: true,
                        })
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No recent problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProblems;