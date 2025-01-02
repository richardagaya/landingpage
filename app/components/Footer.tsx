// components/Footer.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">ONTRACC</h2>
          <p className="mt-4 text-sm">
            Connecting you to everything you need — with style, ease, and reliability.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500">Blog</a></li>
            <li><a href="#" className="hover:text-orange-500">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Services</a></li>
            <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
            <li><a href="#" className="hover:text-orange-500">Features</a></li>
            <li><a href="#" className="hover:text-orange-500">Partners</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">FAQs</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Bottom Section */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">&copy; 2024 ONTRACC. All rights reserved.</p>
          {/* Social Media Icons */}
          <div className="flex space-x-6 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-800 hover:text-blue-400 transition"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-800 hover:text-pink-500 transition"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-800 hover:text-blue-700 transition"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
