import React, { useState, useEffect } from "react";
import SearchBar from '../components/Searchbar';
import Problemtable from "../components/Problemtable.jsx";
import FilterComponent from "../components/Filter.jsx";
import axios from 'axios';

const Problems = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [displayedProblems, setDisplayedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({}); 

  // Fetch problems with filters (your existing logic)
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('http://localhost:3000/api/problem/all-problems', {
          params: filters,
          withCredentials: true
        });
        const problems = response.data?.data || [];
        setAllProblems(problems);
      } catch (err) {
        console.error("Error fetching problems", err);
        setAllProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [filters]);

  // Client-side search filtering
  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayedProblems(allProblems);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = allProblems.filter(problem => {
      // Search by title
      const titleMatch = problem.title?.toLowerCase().includes(searchLower);
      
      // Search by problem number (check multiple possible number fields)
      const numberMatch = problem.number?.toString().includes(searchLower) ||
                         problem.id?.toString().includes(searchLower) ||
                         problem.problemNumber?.toString().includes(searchLower);
      
      return titleMatch || numberMatch;
    });

    setDisplayedProblems(filtered);
  }, [allProblems, searchTerm]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 bg-gray-100 p-5">
      
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterComponent setFilters={setFilters} />

        <Problemtable problems={displayedProblems} />
      </div>
    </div>
  );
};

export default Problems;