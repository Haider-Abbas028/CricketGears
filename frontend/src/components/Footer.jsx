// Footer component - site footer
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    // Footer container
    <footer className="bg-gray-900 relative bottom-0 w-full text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company info */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              Cricket Gears
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Heritage Equipment for the Elite Athlete. We combine traditional
              craftsmanship with modern innovation.
            </p>
          </div>

          {/* Owner info */}
          <div className="col-span-1">
            <h3 className="text-yellow-500 font-semibold mb-4 uppercase tracking-wide">
              Owner Information
            </h3>
            <ul className="space-y-4">
              {/* First owner */}
              <li className="flex items-center justify-between gap-3">
                <span className="font-semibold text-yellow-500">
                  Muhammad Ahmad
                </span>
                {/* Social links */}
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiGithub size={16} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
              </li>
              {/* Second owner */}
              <li className="flex items-center justify-between gap-3">
                <span className="font-semibold text-yellow-500">
                  Haider Abbas
                </span>
                {/* Social links */}
                <div className="flex gap-2">
                  <a
                    href="https://github.com/Haider-Abbas028"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiGithub size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/haider-abbas-69a730338/"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/haider_abbas028/"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright section */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 CRICKET GEARS. HERITAGE EQUIPMENT FOR THE ELITE ATHLETE.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
