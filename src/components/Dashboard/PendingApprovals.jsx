
const PendingApprovals = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
            <div className="flex flex-col items-center">
                <span className="text-6xl font-bold text-green-600">3</span>
                <p className="text-gray-500">Farms ready for review</p>
            </div>
        </div>
    );
};

export default PendingApprovals;