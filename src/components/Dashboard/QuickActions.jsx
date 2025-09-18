const QuickActions = ({ onRegisterClick, onInspectClick,onViewAllFarmersClick }) => {
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
                <button className="w-full py-3 rounded-lg text-white font-semibold bg-gray-600 hover:bg-gray-700 transition duration-300"
                    onClick={onViewAllFarmersClick}
                >
                    
                    View All Farmers
                </button>
            </div>
        </div>
    );
};

export default QuickActions;