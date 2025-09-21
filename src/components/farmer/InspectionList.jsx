import { useEffect, useState } from "react";
import Loader from "../app/Loader";
import Sidebar from "../Dashboard/Sidebar";

import { getInspections } from "../../utils/api";

const Inspection = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllInspections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInspections();
      const inspectionData = response.data.content || [];
      setInspections(inspectionData);
    } catch (err) {
      console.error("Error fetching inspections:", err);
      setError("Failed to fetch inspections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInspections();
  }, []);

  if (loading) return <Loader text="Fetching Inspections..." />;
  if (error)
    return <p className="p-6 text-red-600 text-center font-medium">{error}</p>;

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          All Inspections
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Farm Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Compliance Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspections.map((inspection) => (
                <tr key={inspection.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {inspection.farmName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {inspection.status}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {inspection.complianceScore}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {inspection.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inspection;
