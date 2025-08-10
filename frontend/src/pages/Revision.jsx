import {useState, useEffect} from "react";
import React from "react";
import axios from "axios";
import Card from "../components/Card.jsx";
import RevisionTable from '../components/RevisionTable.jsx';


const Revision = () => {

  const [revisionDue, setRevisionDue] = useState([]);

  useEffect(()=>{

    const fetchRevisionDue = async () => {
    try{
    
      const Revisiondue= await axios.get('http://localhost:3000/api/revision/revision-schedule');
      setRevisionDue(Revisiondue.data.data || []);
      console.log("Revision Due Problems:", Revisiondue.data);
    }
    catch(error){
      console.error("Error fetching revision due problems:", error);
    }
}
fetchRevisionDue();

},[]);  



  return (
    
    
      <div className="flex flex-col items-center justify-center py-10 px-4">
     <h1 className="text-3xl font-bold text-gray-700 mb-2 text-center">Revision Dashboard</h1>
          <p className="text-gray-600 text-center ">Review and practice problems you've marked for revision. Stay consistent and track your progress!</p>
        <RevisionTable problems={revisionDue}/>
      
        
        
    </div>
  );
};

export default Revision;
