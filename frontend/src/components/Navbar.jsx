const Navbar=()=>{
  return(
    <div className="flex items-center p-2 justify-between w-full bg-gray-100 h-13">
      <div className="flex-1"> 
        <input className=" p-1 border border-gray-500 flex rounded-full shadow-lg bg-gray-100 items-center hover:w-70" placeholder="Search"></input>
      </div>
      <div className="flex-1"> logo</div>
      <div className="bg-black rounded-full w-10 h-10"> </div>
    </div>
  )
}

export default Navbar;