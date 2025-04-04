import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-2 text-xl font-merriweather font-bold">
                Madison Law Group
              </span>
            </div>
            <p className="mt-4 text-gray-300">
              Dedicated to providing experienced legal representation across
              personal injury, family law, and estate planning.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#practice-areas"
                  className="text-gray-300 hover:text-white"
                >
                  Personal Injury
                </a>
              </li>
              <li>
                <a
                  href="#practice-areas"
                  className="text-gray-300 hover:text-white"
                >
                  Family Law
                </a>
              </li>
              <li>
                <a
                  href="#practice-areas"
                  className="text-gray-300 hover:text-white"
                >
                  Estate Planning
                </a>
              </li>
              <li>
                <a
                  href="#practice-areas"
                  className="text-gray-300 hover:text-white"
                >
                  Medical Malpractice
                </a>
              </li>
              <li>
                <a
                  href="#practice-areas"
                  className="text-gray-300 hover:text-white"
                >
                  Workers' Compensation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Office Locations</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white">Downtown Office</p>
                <address className="not-italic text-gray-300">
                  123 Legal Avenue, Suite 500
                  <br />
                  Boston, MA 02110
                </address>
                <p className="mt-2 text-gray-300">(617) 555-1234</p>
              </div>
              <div>
                <p className="font-medium text-white">Suburban Office</p>
                <address className="not-italic text-gray-300">
                  456 Justice Plaza
                  <br />
                  Cambridge, MA 02142
                </address>
                <p className="mt-2 text-gray-300">(617) 555-5678</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <p className="mt-4 text-gray-300">
              Emergency consultations available 24/7
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} Madison Law Group. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
