const RecentInspections = () => {
    const inspections = [
        { farm: 'Green Valley', status: 'Submitted', progress: '85%' },
        { farm: 'Sunset Fields', status: 'Draft', progress: '40%' },
        { farm: 'Oak Knoll', status: 'Approved', progress: '92%' },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Inspections</h2>
            <ul>
                {inspections.map((inspection, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200">
                        <p className="text-gray-800 font-medium">Farm: {inspection.farm}</p>
                        <small className="text-gray-500">({inspection.status}, {inspection.progress})</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentInspections;