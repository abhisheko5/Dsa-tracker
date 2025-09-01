import React, { useState, useEffect } from "react";
import SearchBar from '../components/Searchbar';
import Problemtable from "../components/Problemtable.jsx";
import FilterComponent from "../components/Filter.jsx";
import axios from 'axios';
import api from "./api/axios";  // use this instead of raw axios


const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({}); 

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true); 
        const response = await api.get('/api/problem/all-problems', {
          params: filters,
        });
        setProblems(response.data.data || []);
      } catch (err) {
        console.error("Error fetching problems", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [filters]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 bg-gray-100 p-5">
      
        <SearchBar
          searchTerm={filters.search || ""}
          setSearchTerm={(value) =>
            setFilters(prev => ({ ...prev, search: value }))
          }
        />

        <FilterComponent setFilters={setFilters} />

        <Problemtable problems={problems} />
      </div>
    </div>
  );
};

export default Problems;
