"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top Banner */}
      <a href="/Quiz" className="block">
        <div className="bg-gold text-darkblue text-xl py-6 px-6 text-center">
          <strong>SIX FIGURE CEO ROADMAP:</strong> Get a free personalised $0 to $150k a month business roadmap →
        </div>
      </a>

      {/* Navbar */}
      <nav className="bg-darkblue text-white py-4 px-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpg" // Replace with your logo path
              alt="Logo"
              className="h-10 md:h-12" // Adjust logo size for mobile vs desktop
            />
            <span className="text-xl font-bold text-gold">ONTRACC</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 text-gold">
            <li className="hover:text-white cursor-pointer">Testimonials</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
            <li className="hover:text-white cursor-pointer">Books</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Connect</li>
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

        {/* Mobile Dropdown */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } bg-darkblue text-white flex flex-col items-center space-y-4 py-4 md:hidden`}
        >
          <li className="hover:text-gold cursor-pointer">Testimonials</li>
          <li className="hover:text-gold cursor-pointer">Courses</li>
          <li className="hover:text-gold cursor-pointer">Books</li>
          <li className="hover:text-gold cursor-pointer">About</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
