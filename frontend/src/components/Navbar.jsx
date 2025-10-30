import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Optional icon (from lucide-react)

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate(`/`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    navigate(`/`);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-900">
            hd
          </div>
          <h1 className="text-lg font-medium text-gray-800">highway delite</h1>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-100 rounded-lg overflow-hidden w-full sm:max-w-md"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search experiences or locations..."
            className="w-full px-4 py-2 text-sm bg-transparent outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-2 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-yellow-500"
          >
            Search
          </button>
        </form>

        
      </div>
    </nav>
  );
}
