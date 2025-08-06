import React,{useState,useEffect} from "react";
import Problemtable from "../components/Problemtable.jsx";
import axios from 'axios';


const Problems=()=>{
  const [problems,setProblems]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchProblems=async()=>{
      try{
        const response= await axios.get('http://localhost:3000/api/problem/all-problems')
        setProblems(response.data.problems);
      } catch(err){
        console.error("error fetching problems",err);
      }
      setLoading(false);
    };

    fetchProblems();
  },[]);

  if(loading) return <p>Loading...</p>

  return(
    <div className=" flex h-screen ">
      <div className=" flex flex-col flex-1 bg-gray-100 p-5">
        <Problemtable problems={problems}/>
        
        </div>
        </div>
  )
}

export default Problems;