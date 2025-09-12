import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center mb-4 p-4 bg-white shadow-md rounded-lg">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <label className="sr-only" htmlFor="search-input">
          Search problems by title or number
        </label>
        <input
          id="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search problems by title or number..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;