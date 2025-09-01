import React from "react";
import api from "./api/axios";  // use this instead of raw axios

import { useProblemContext } from "../context/ProblemContext";


const ProblemForm = () => {
  const[problemNo, setProblemNo] = React.useState("");
  const[problemTitle, setProblemTitle] = React.useState("");
  const[difficulty, setDifficulty] = React.useState("");
  const[topic, setTopic] = React.useState([]);
  const[status, setStatus] = React.useState("unsolved");
  const[url, setUrl] = React.useState("");
  const[platform, setPlatform] = React.useState("");
  const { setproblems } = useProblemContext();
  
  const handleSubmit= async(e)=>{
    e.preventDefault();

    const problemData={
      title:problemTitle,
      problemNo,
      topic,
      difficulty,
      problemStatus:status,
      url,platform
    }

    try{
      const response= await api.post('/api/problem/add',problemData);
    console.log("response",response.data);
    setproblems(prevProblems => [...prevProblems, response.data.data]);
  }
    catch(error){
      console.error('error adding problem',error);
    }
    console.log({

      problemNo,
      problemTitle,
      difficulty,
      topic,
      status,
      url,
      platform,
    })
  }

  return (
    <form onSubmit={handleSubmit}> 
    <div className="w-full   mx-auto  p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Problem</h2>

      {/*problem number*/}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Problem No</label>
        <input
          onChange={(e)=>setProblemNo(e.target.value)}
          type="number"
          placeholder="Enter the No"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Problem Title</label>
        <input
        onChange={(e)=>setProblemTitle(e.target.value)}
          type="text"
          placeholder="Enter the title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Difficulty Dropdown */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Difficulty</label>
        <select 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e)=>setDifficulty(e.target.value)}
>
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>


      {/*problem topic*/}

      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Topic</label>
        <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        onChange={(e)=>{
          const selectedOptions=Array.from(e.target.selectedOptions).map(opt=>opt.value);
          setTopic(selectedOptions)}
        }>
          <option value="" disabled>Select Topic</option>
          <option value="Array">Array</option>
          <option value="String">String</option>
          <option value="Linked List">Linked List</option>
          <option value="Stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="graph">Graph</option>
          <option value="tree">Tree</option>
          <option value="hashmap">Hashmap</option>
          <option value="hashmap">Binary Search</option>
          <option value="set">Set</option>
          <option value="heap">Heap</option>
          <option value="trie">Trie</option>
          <option value="trie">Backtracking</option>
          <option value="trie">Recursion</option>
          <option value="trie">Dynamic Programming</option>
        </select>
      </div>


      {/* problem status */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Status</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          defaultValue="unsolved"
          onChange={(e)=>setStatus(e.target.value)}
>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
          <option value="in-progress">In Progress</option>
        </select>
        </div>

      {/*problem url */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Problem URL</label>
        <input
        onChange={(e)=>setUrl(e.target.value)}

          type="text"
          placeholder="Enter the problem URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
      

      {/*problem platform */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Platform</label>
        <input
        onChange={(e)=>setPlatform(e.target.value)}
        type="text"
        placeholder="Enter the platform name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      {/* Submit Button */}
      <button  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
        Add
      </button>
    </div>
    </form>
  );
};

export default ProblemForm;
