"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              MyWebsite
            </Link>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="hover:text-blue-300">
              About
            </Link>
            <Link href="/services" className="hover:text-blue-300">
              Services
            </Link>
            <Link href="/contact" className="hover:text-blue-300">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden space-y-1">
            <Link href="/about" className="block py-2 px-4 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/services" className="block py-2 px-4 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/contact" className="block py-2 px-4 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
