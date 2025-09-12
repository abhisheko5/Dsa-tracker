import {createContext, useContext, useState,useEffect} from 'react';
import axios from 'axios';

const ProblemContext = createContext();

export const useProblemContext = () => useContext(ProblemContext);


export const ProblemProvider = ({children})=>{
  const[problems,setproblems]=useState([]);  

  useEffect(()=>{
    const fetchProblems = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/problem/all-problems',{ withCredentials: true });
        console.log("response", response.data);
        setproblems(response.data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      };
    }
    fetchProblems();
  },[]);
  
  
  return (<ProblemContext.Provider value={{problems, setproblems}}>
    {children}
  </ProblemContext.Provider>
  )
}