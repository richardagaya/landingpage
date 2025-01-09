import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Ensure FontAwesome CSS is loaded
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Prevent auto-adding of CSS

const BottomSection = () => {
  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo and Copyright Text */}
        <div className="flex items-center space-x-4">
          <img src="/logo.jpg" alt="The HUB Logo" className="w-10 h-10" />
          <p className="text-sm text-gray-600">&copy; 2025 ONTRACC. All rights reserved.</p>
        </div>

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
  );
};

export default BottomSection;
