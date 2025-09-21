import { Link } from "react-router-dom";
const QuickActions = ({ onRegisterClick, onInspectClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
                <button
                    onClick={onRegisterClick}
                    className="w-full py-3 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition duration-300"
                >
                    Register New Farmer
                </button>
                <button
                    onClick={onInspectClick}
                    className="w-full py-3 rounded-lg text-white font-semibold bg-lime-500 hover:bg-lime-600 transition duration-300"
                >
                    Start Inspection
                </button>
                <Link
                    to="/farmers"
                    className="w-full block py-3 rounded-lg text-center text-white font-semibold bg-gray-600 hover:bg-gray-700 transition duration-300 shadow-md"
                >
                    View All Farmers
                </Link>
            </div>
        </div>
    );
};

export default QuickActions;