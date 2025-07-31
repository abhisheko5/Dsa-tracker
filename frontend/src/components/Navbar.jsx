const Navbar=()=>{
  return(
    <div className="flex items-center p-2 justify-between w-full bg-gray-500 h-13">
      <div className="flex-1"> 
        <input className=" pl-2 flex rounded-full shadow-lg outline-none bg-white  items-center hover:w-70" placeholder="Search"></input>
      </div>
      <div className="flex-1"> logo</div>
      <div className=""> logo</div>
    </div>
  )
}

export default Navbar;