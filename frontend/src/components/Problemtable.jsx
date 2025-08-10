function Problemtable({ problems }) {

   if (!problems || !Array.isArray(problems)) {
    return <div>Loading problems...</div>; // or show "No problems available"
  }

  


  return(
    <div>
     <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden ">
    <thead className="">
      <tr>
        <th className="px-4 py-2 text-left text-gray-700">No</th>
        <th className="px-4 py-2 text-left text-gray-700">Title</th>
        <th className="px-4 py-2 text-left text-gray-700">Difficulty</th>
        <th className="px-4 py-2 text-left text-gray-700">Topic</th>
        <th className="px-4 py-2 text-left text-gray-700">Status</th>
      </tr>
    </thead>
    <tbody>
      {problems.map((problem, index) => (
      <tr key={problem._id} className="border border-gray-200">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{problem.title}</td>
        <td className="px-4 py-2">{problem.difficulty}</td>
        <td className="px-4 py-2">{problem.topic?.name }</td>
        <td className="px-4 py-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${problem.status === 'solved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {problem.problemstatus?.status || 'Pending'}
          </span>  
          </td>
      </tr>
      ))}
    </tbody>
  </table>
    </div>
  )
}

export default Problemtable;