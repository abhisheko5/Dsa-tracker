import {useState, useEffect} from "react";
import React from "react";
import axios from "axios";
import Card from "../components/Card.jsx";
import RevisionTable from '../components/RevisionTable.jsx';
import toast from 'react-hot-toast';



const Revision = () => {

  const [revisionDue, setRevisionDue] = useState([]);
  


  useEffect(()=>{

    const fetchRevisionDue = async () => {
    try{
    
      const Revisiondue= await axios.get('http://localhost:3000/api/revision/revision-schedule');
      const dueProblems=Revisiondue.data.data || []
      setRevisionDue(dueProblems);
      console.log("Revision Due Problems:", dueProblems);

        if (dueProblems.length > 0) {
          dueProblems.forEach((p) => {
            const title = p.problem?.title || p.title;
            toast.success(`Revision due: ${title}`, {
              duration: 5000,
              style: {
                background: '#fef3c7', // light yellow
                color: '#b45309',       // amber text
              },
            });
          });
        }
    
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
