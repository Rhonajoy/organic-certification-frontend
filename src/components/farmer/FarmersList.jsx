

const Farmers = ({ onBackClick }) => {
  const farmers = [
    { id: 1, name: 'John Doe', farm: 'Green Acres', location: 'Rural, USA', status: 'Active' },
    { id: 2, name: 'Jane Smith', farm: 'Sunset Farms', location: 'Midwest, USA', status: 'Active' },
    { id: 3, name: 'Sam Wilson', farm: 'Oak Knoll', location: 'California, USA', status: 'Pending' },
    { id: 4, name: 'Sarah Lee', farm: 'Harvest Valley', location: 'New York, USA', status: 'Active' },
    { id: 5, name: 'David Chen', farm: 'Cherry Creek', location: 'Oregon, USA', status: 'Pending' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Farmers</h1>
        <button
          onClick={onBackClick}
          className="py-2 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition"
        >
          &larr; Back to Dashboard
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farm
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {farmer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.farm}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${farmer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {farmer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-green-600 hover:text-green-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;