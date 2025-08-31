import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

function Problemtable({ problems: initialProblems }) {
  const [problems, setProblems] = useState(initialProblems || []);

  useEffect(() => {
    setProblems(initialProblems || []);
  }, [initialProblems]);

  const handleClick = async (problemNo) => {
    try {
      const deletedProblem = await axios.delete(
        `http://localhost:3000/api/problem/delete/${problemNo}`
      );

    
      setProblems((prev) => prev.filter((p) => p.problemNo !== problemNo));

      toast.success(deletedProblem.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  if (!problems || !Array.isArray(problems)) {
    return <div>Loading problems...</div>;
  }

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden ">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-700">No</th>
            <th className="px-4 py-2 text-left text-gray-700">Title</th>
            <th className="px-4 py-2 text-left text-gray-700">Difficulty</th>
            <th className="px-4 py-2 text-left text-gray-700">Topic</th>
            <th className="px-4 py-2 text-left text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem._id} className="border border-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {problem.title}
                </a>
              </td>
              <td className="px-4 py-2">{problem.difficulty}</td>
              <td className="px-4 py-2">{problem.topic?.name}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    problem.problemStatus?.status === "solved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {problem.problemStatus?.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <FaEdit
                  className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                  size={18}
                />
                <FaTrash
                  onClick={() => handleClick(problem.problemNo)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer"
                  size={18}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Problemtable;
