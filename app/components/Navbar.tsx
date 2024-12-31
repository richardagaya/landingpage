"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top Banner */}
      <div className="bg-purple-600 text-white text-sm py-2 px-4 text-center">
        NEW: <strong>SIX FIGURE CEO ROADMAP:</strong> Get a free personalised $0 to $150k a month business roadmap →
      </div>

      {/* Navbar */}
      <nav className="bg-gray-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpg" // Replace with your logo
              alt="Logo"
              className="h-8"
            />
            <span className="text-xl font-bold">ONTRACC</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8">
            <li className="hover:text-purple-500 cursor-pointer">Workshops</li>
            <li className="hover:text-purple-500 cursor-pointer">Courses</li>
            <li className="hover:text-purple-500 cursor-pointer">Books</li>
            <li className="hover:text-purple-500 cursor-pointer">Media</li>
            <li className="hover:text-purple-500 cursor-pointer">Partner With Us</li>
            <li className="hover:text-purple-500 cursor-pointer">About the Firm</li>
            <li className="hover:text-purple-500 cursor-pointer">Careers</li>
          </ul>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown without Animation */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300`}
        >
          <li className="hover:text-purple-500 cursor-pointer">Workshops</li>
          <li className="hover:text-purple-500 cursor-pointer">Courses</li>
          <li className="hover:text-purple-500 cursor-pointer">Books</li>
          <li className="hover:text-purple-500 cursor-pointer">Media</li>
          <li className="hover:text-purple-500 cursor-pointer">Partner With Us</li>
          <li className="hover:text-purple-500 cursor-pointer">About the Firm</li>
          <li className="hover:text-purple-500 cursor-pointer">Careers</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;