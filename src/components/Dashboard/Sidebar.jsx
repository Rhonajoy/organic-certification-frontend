import { FaHome, FaTractor, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import Icon from "../app/Icon";
const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 w-64 h-full bg-white p-6 shadow-xl">
      <div className="flex items-center space-x-3 text-lg font-bold text-gray-800 mb-8">
        <span>Organic-Certified</span>
      </div>
      <ul>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            
            <Icon as={FaHome}  />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/farmers"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            <Icon as={FaTractor}  />
            <span>Farmers</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/inspections"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            <Icon as={FaClipboardList}  />
            <span>Inspections</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
