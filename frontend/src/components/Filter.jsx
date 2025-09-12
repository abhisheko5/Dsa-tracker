import React, { useState } from "react";

const FilterComponent = ({ setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    topic: "",
    difficulty: "",
    status: "",
    pattern: ""
  });

  const filterOptions = {
    topic: ["Array", "String", "Linked List", "Tree","Stack","Graph","Greedy","Binary Search","Heap","Queue","Recursion"],
    difficulty: ["Easy", "Medium", "Hard"],
    status: ["Solved", "Unsolved", "Attempted"],
    pattern: ["Two Pointers", "Sliding Window","Binary Search","Prefix Sum","Dynamic Programming","Monotonic Stack"]
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);

    // Only send non-empty filters to parent
    const cleanFilters = Object.fromEntries(
      Object.entries(updatedFilters).filter(([_, v]) => v)
    );
    setFilters(cleanFilters);
  };

  const clearAll = () => {
    setLocalFilters({ topic: "", difficulty: "", status: "", pattern: "" });
    setFilters({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={clearAll}
          className="text-red-500 text-sm hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Render simple dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(filterOptions).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {key}
            </label>
            <select
              value={localFilters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select {key}</option>
              {filterOptions[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;