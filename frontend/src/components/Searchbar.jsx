function Searchbar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center mb-2 justify-between p-4 bg-white shadow-md rounded-lg">
      <label className="w-full">
        <span className="sr-only">Search problems</span> {/* Screen-reader text */}
        <input
          id="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search problems..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
}
 export default Searchbar;