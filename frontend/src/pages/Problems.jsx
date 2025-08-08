import React,{useState,useEffect} from "react";
import SearchBar from '../components/Searchbar';
import Problemtable from "../components/Problemtable.jsx";
import Filter from "../components/Filter.jsx";
import axios from 'axios';


const Problems=()=>{
  const [problems,setProblems]=useState([]);
  const[loading,setLoading]=useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    const fetchProblems=async()=>{
      try{
        const response= await axios.get('http://localhost:3000/api/problem/all-problems')
        setProblems(response.data.data || []);
      } catch(err){
        console.error("error fetching problems",err);
      }
      setLoading(false);
    };

    fetchProblems();
  },[]);

  if(loading) return <p>Loading...</p>


  const filteredProblems = problems.filter((problem) =>
    problem.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div className=" flex h-screen ">
      <div className=" flex flex-col flex-1 bg-gray-100 p-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter Problems={problems} />
        <Problemtable problems={filteredProblems}/>
        
        </div>
        </div>
  )
}

export default Problems;