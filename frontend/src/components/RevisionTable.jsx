import Card from "../components/Card.jsx";
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import axios from 'axios';



const RevisionTable=({problems})=>{
 if (!problems || !Array.isArray(problems) || problems.length === 0) {
    return <div>No problems available</div>; // or show "No problems available"
  }
  console.log(problems._id)

    const handleChange=async(id)=>{
    try{
    await axios.post(`http://localhost:3000/api/revision/${id}/revisiondone`,{ withCredentials: true})
        toast.success('Revision marked done!');
    }
    catch(error){
      console.error("Error marking revision done",error);
      toast.error('failed to mark revision done');
    }
  }


return(
  <div className=" w-full flex flex-col items-center justify-center py-10 px-4">

<Card className="w-full max-w-6xl p-6 bg-gray-500 shadow-md rounded-xl">
          <h2 className="text-xl text-center item-center font-semibold  mb-4">Today's Revision Schedule</h2>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">No</th>
                <th className="px-4 py-2 text-left text-gray-700">Title</th>
                <th className="px-4 py-2 text-left text-gray-700">Last Attempted</th>
                <th className="px-4 py-2 text-left text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-gray-700">Link</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                console.log("Problem IDs:", problems.map(p => p._id)),

      <tr key={problem._id} className="border border-gray-200">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{problem.title}</td>
        <td className="px-4 py-2">{problem.Attempted
                                    ?formatDistanceToNow(new Date(problem.Attempted),{addSuffix:true})
                                  :"no attempts yet"}</td>
        <td className="px-4 py-2">{problem.status}</td>
        <td className="px-4 py-2">{problem.url}

        </td>
          <td className="px-4 py-2">
  <button onClick={()=>handleChange(problem.problemNo)}  className="px-2 py-1 bg-black text-white rounded hover:bg-gray-600"
  >
    Done
  </button>
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