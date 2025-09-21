import { useEffect, useState } from "react";

import { getPendingApprovals } from "../../utils/api";

const PendingApprovals = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDraftCount = async () => {
      try {
        const response = await getPendingApprovals();
        setCount(response.data);
      } catch (err) {
        console.error("Error fetching draft count:", err);
        setError("Failed to load count");
      } finally {
        setLoading(false);
      }
    };

    fetchDraftCount();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
      <div className="flex flex-col items-center">
        {loading ? (
          <span className="text-6xl font-bold text-gray-400">...</span>
        ) : error ? (
          <span className="text-red-600">{error}</span>
        ) : (
          <span className="text-6xl font-bold text-green-600">{count}</span>
        )}
        <p className="text-gray-500">Farms ready for review</p>
      </div>
    </div>
  );
};

export default PendingApprovals;
