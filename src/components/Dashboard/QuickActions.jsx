import { Link } from "react-router-dom";
import { FaPlus, FaList } from "react-icons/fa";

const QuickActions = ({ onRegisterClick }) => {
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto gap-4 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onRegisterClick}
        className="flex items-center justify-start gap-2 px-4 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-green-600 transition transform hover:scale-105"
      >
        <FaPlus />
        Register New Farmer
      </button>

      <Link
        to="/inspections"
        className="flex items-center justify-start gap-2 px-4 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-green-600 transition transform hover:scale-105"
      >
        <FaList />
        View All Inspections
      </Link>

      <Link
        to="/farmers"
        className="flex items-center justify-start gap-2 px-4 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-green-500 transition transform hover:scale-105"
      >
        <FaList />
        View All Farmers
      </Link>
    </div>
  );
};

export default QuickActions;
