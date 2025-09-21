import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../app/Loader";
import RegisterFarmModal from "./RegisterFarmModal";
import RegisterFieldModal from "./RegisterFieldModal";
import InspectionModal from "./InspectionModal"; // ✅ import inspection modal

const API_BASE =
  "https://organic-certification-backend-production.up.railway.app/organic-certified";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For modals
  const [openModal, setOpenModal] = useState(null); // "farm" | "field"
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState(null);

  // For inspection modal
  const [openInspectionFarmId, setOpenInspectionFarmId] = useState(null);

  const fetchFarmers = async () => {
    try {
      setLoading(true);

      // 1. Get all farmers
      const farmerRes = await axios.get(`${API_BASE}/farmers`);
      const farmersData = farmerRes.data.content || [];

      // 2. For each farmer, fetch their farms
      const farmersWithFarms = await Promise.all(
        farmersData.map(async (farmer) => {
          try {
            const farmRes = await axios.get(
              `${API_BASE}/farms/farmer/${farmer.id}`
            );
            const farms = farmRes.data.content || [];

            // 3. For each farm, fetch its fields
            const farmsWithFields = await Promise.all(
              farms.map(async (farm) => {
                try {
                  const fieldRes = await axios.get(
                    `${API_BASE}/fields/farm/${farm.id}`
                  );
                  return { ...farm, fields: fieldRes.data.content || [] };
                } catch {
                  return { ...farm, fields: [] };
                }
              })
            );

            return { ...farmer, farms: farmsWithFields };
          } catch {
            return { ...farmer, farms: [] };
          }
        })
      );

      setFarmers(farmersWithFarms);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  if (loading) return <Loader text="Fetching farmers..." />;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Farmers</h1>
        <Link
          to="/"
          className="py-2 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Farms & Fields
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer.id}>
                {/* Farmer Info */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {farmer.name}
                </td>

                {/* Farms + Fields */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {farmer.farms && farmer.farms.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {farmer.farms.map((farm) => (
                        <li key={farm.id} className="mb-2">
                          <div className="font-semibold flex items-center gap-2">
                            {farm.farmName} - {farm.location}
                            <button
                              onClick={() => {
                                setSelectedFarmId(farm.id);
                                setOpenModal("field");
                              }}
                              className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                            >
                              + Add Field
                            </button>
                            <button
                              onClick={() => setOpenInspectionFarmId(farm.id)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800 text-xs"
                            >
                              🚀 Start Inspection
                            </button>
                          </div>

                          {/* Fields under farm */}
                          {farm.fields && farm.fields.length > 0 ? (
                            <ul className="ml-6 list-square list-inside text-gray-700">
                              {farm.fields.map((field) => (
                                <li key={field.id}>
                                  {field.fieldName} – {field.crop} ({field.areaHa} Ha)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="ml-6 text-gray-400 italic">
                              No fields yet
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">No farms yet</p>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => {
                      setSelectedFarmerId(farmer.id);
                      setOpenModal("farm");
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    + Add Farm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <RegisterFarmModal
        isOpen={openModal === "farm"}
        onClose={() => {
          setOpenModal(null);
          fetchFarmers();
        }}
        farmerId={selectedFarmerId}
      />

      <RegisterFieldModal
        isOpen={openModal === "field"}
        onClose={() => {
          setOpenModal(null);
          fetchFarmers();
        }}
        farmId={selectedFarmId}
      />

      {/* 🔹 Inspection Modal */}
      <InspectionModal
        isOpen={!!openInspectionFarmId}
        onClose={() => {
          setOpenInspectionFarmId(null);
          fetchFarmers(); // refresh inspection status after closing
        }}
        farmId={openInspectionFarmId}
      />
    </div>
  );
};

export default Farmers;
