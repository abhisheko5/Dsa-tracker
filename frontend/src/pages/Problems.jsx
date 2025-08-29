import React, { useState, useEffect } from "react";
import SearchBar from '../components/Searchbar';
import Problemtable from "../components/Problemtable.jsx";
import FilterComponent from "../components/Filter.jsx";
import axios from 'axios';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({}); // includes search now

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true); //
        const response = await axios.get('http://localhost:3000/api/problem/all-problems', {
          params: filters, // filters now includes search
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
        {/* Search updates filters */}
        <SearchBar
          searchTerm={filters.search || ""}
          setSearchTerm={(value) =>
            setFilters(prev => ({ ...prev, search: value }))
          }
        />

        {/* Filters component updates filters */}
        <FilterComponent setFilters={setFilters} />

        {/* Use API response directly */}
        <Problemtable problems={problems} />
      </div>
    </div>
  );
};

export default Problems;
