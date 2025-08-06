const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-3 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-indigo-600 tracking-wide">DSA Tracker</span>
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <input
          className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Search..."
        />
      </div>

      {/* Profile Icon */}
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow">
          <span className="text-gray-500 text-lg font-semibold">U</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;