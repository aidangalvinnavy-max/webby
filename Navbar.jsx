
import React from 'react';

const Navbar = () => (
  <nav className="bg-[#343A40] text-white p-4 sticky top-0 z-50 shadow-md">
    <div className="container mx-auto flex justify-center flex-wrap gap-x-6 gap-y-2">
      <a href="#profile" className="font-semibold hover:text-[#28A745] transition-colors duration-300">Profile</a>
      <a href="#matchmaking" className="font-semibold hover:text-[#28A745] transition-colors duration-300">Matchmaking</a>
    </div>
  </nav>
);

export default Navbar;
