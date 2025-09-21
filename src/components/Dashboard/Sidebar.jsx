import { FaHome, FaTractor, FaClipboardList, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navItems = [
    { icon: <FaHome />, text: "Home" },
    { icon: <FaTractor />, text: "Farmers" },
    { icon: <FaClipboardList />, text: "Inspections" },
    { icon: <FaUsers />, text: "Team" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-64 h-full bg-white p-6 shadow-xl">
      <div className="flex items-center space-x-3 text-lg font-bold text-gray-800 mb-8">
        <span>Agri-Certify</span>
      </div>
      <ul>
        <li className="mb-2">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/farmers"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            <FaTractor />
            <span>Farmers</span>
          </Link>
        </li>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-700 transition duration-200 font-medium"
          >
            <FaClipboardList />
            <span>Inspections</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
