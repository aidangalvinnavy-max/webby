
import React from 'react';

const Footer = () => (
  <footer className="bg-[#343A40] text-white text-center p-6 mt-16">
    <p>&copy; 2025 MedConneX. All rights reserved.</p>
    <div className="flex justify-center gap-x-6 mt-4">
      <a href="#privacy-policy" className="text-white hover:text-[#28A745] transition-colors duration-300">Privacy Policy</a>
      <span className="text-gray-500">|</span>
      <a href="#terms-conditions" className="text-white hover:text-[#28A745] transition-colors duration-300">Terms & Conditions</a>
    </div>
  </footer>
);

export default Footer;
