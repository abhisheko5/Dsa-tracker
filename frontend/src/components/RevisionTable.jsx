import Card from "../components/Card.jsx";

const RevisionTable=({problems})=>{
 if (!problems || !Array.isArray(problems)) {
    return <div>Loading problems...</div>; // or show "No problems available"
  }

return(
  <div className=" w-full flex flex-col items-center justify-center py-10 px-4">

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
              {problems.map((problem, index) => (
      <tr key={problem._id} className="border border-gray-200">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{problem.title}</td>
        <td className="px-4 py-2">{problem}</td>
        <td className="px-4 py-2">{problem.problemstatus?.status }</td>
        <td className="px-4 py-2">
                <button className>Revise</button>
          </td>
      </tr>
      ))}
            </tbody>
          </table>
        </Card>

        </div>
)
}
export default RevisionTable;