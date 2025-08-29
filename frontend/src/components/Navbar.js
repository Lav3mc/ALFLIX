import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link to="/browse" className="text-red-600 font-bold text-2xl">
            ALFLIX
          </Link>
          
          <ul className="hidden md:flex items-center space-x-6 text-sm">
            <li><Link to="/browse" className="hover:text-gray-300 transition-colors">Home</Link></li>
            <li><Link to="/browse" className="hover:text-gray-300 transition-colors">TV Shows</Link></li>
            <li><Link to="/browse" className="hover:text-gray-300 transition-colors">Movies</Link></li>
            <li><Link to="/browse" className="hover:text-gray-300 transition-colors">New & Popular</Link></li>
            <li><Link to="/browse" className="hover:text-gray-300 transition-colors">My List</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/70 border border-white/20 text-white placeholder-gray-400 px-3 py-1 text-sm rounded-sm w-64 focus:outline-none focus:border-white/40"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setShowSearch(false);
                  }}
                />
                <Search className="w-5 h-5 ml-2 text-white cursor-pointer" onClick={() => setShowSearch(false)} />
              </form>
            ) : (
              <Search 
                className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" 
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>

          <Bell className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-1 cursor-pointer group">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-200" />
          </div>

          {/* Mobile Menu */}
          <Menu className="w-6 h-6 text-white md:hidden cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;