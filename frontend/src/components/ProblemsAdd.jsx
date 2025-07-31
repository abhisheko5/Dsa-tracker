
const ProblemForm=()=>{
  return(
    <div className=" bg-gray-400">
      <div className="flex flex-col p-4">
      <label className="font-bold">ProblemNo</label>
      <input className="mt-2 p-2 items-center bg-white" type="Number" placeholder="enter the problem"></input>
    
      <label className="font-bold">Title</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Difficulty</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Topic</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Intuition</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Url</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Platform</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>

      <label className="font-bold">Title</label>
      <input className="mt-2 p-2 items-center bg-white" type="text" placeholder="enter the problem"></input>
</div>

  </div>

  )
}

export default ProblemForm;