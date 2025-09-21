import { useEffect, useState } from "react";
import Loader from "../app/Loader";
import { getRecentInspections } from "../../utils/api";

const RecentInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentInspections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRecentInspections();
      setInspections(response.data);
    } catch (err) {
      console.error("Error fetching recent inspections:", err);
      setError("Failed to fetch recent inspections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentInspections();
  }, []);

  if (loading) return <Loader text="Fetching Recent Inspections..." />;
  if (error) return <p className="p-4 text-red-600 text-center">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Inspections</h2>
      <ul>
        {inspections.map((inspection) => (
          <li
            key={inspection.id}
            className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200"
          >
            <p className="text-gray-800 font-medium">
              Farm: {inspection.farmName}
            </p>
            <small className="text-gray-500">
              ({inspection.status}, {inspection.complianceScore || "N/A"}%)
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentInspections;
