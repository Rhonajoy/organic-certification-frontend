import { useEffect, useState } from "react";
import { FaPlus,FaRocket } from "react-icons/fa";
import Icon from "../app/Icon";
import Loader from "../app/Loader";
import RegisterFarmModal from "./RegisterFarmModal";
import RegisterFieldModal from "./RegisterFieldModal";
import InspectionModal from "./InspectionModal";
import { getFarmers, getFarmsByFarmer, getFieldsByFarm } from "../../utils/api";
import Sidebar from "../Dashboard/Sidebar";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(null);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [inspectionFarmId, setInspectionFarmId] = useState(null);

  const [expandedFarmers, setExpandedFarmers] = useState({});

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      setError(null);

      const farmerRes = await getFarmers();
      const farmersData = farmerRes.data.content || [];

      const farmersWithFarms = await Promise.all(
        farmersData.map(async (farmer) => {
          try {
            const farmRes = await getFarmsByFarmer(farmer.id);
            const farms = farmRes.data.content || [];

            const farmsWithFields = await Promise.all(
              farms.map(async (farm) => {
                try {
                  const fieldRes = await getFieldsByFarm(farm.id);
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

  const toggleExpanded = (farmerId) => {
    setExpandedFarmers((prev) => ({
      ...prev,
      [farmerId]: !prev[farmerId],
    }));
  };

  if (loading) return <Loader text="Fetching farmers..." />;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">All Farmers</h1>
        </div>

        <div className="space-y-6">
          {farmers.length === 0 && (
            <p className="text-gray-500 italic">No farmers found.</p>
          )}

          {farmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-md">
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer"
                onClick={() => toggleExpanded(farmer.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-800">
                    {farmer.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({farmer.farms?.length || 0} Farms)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFarmerId(farmer.id);
                      setOpenModal("farm");
                    }}
                    className="py-1 px-3 text-sm rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    <div className="flex gap-1"> 
                    <FaPlus />
                    <p>  Add Farm</p>
                    </div>
                   
                  </button>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      expandedFarmers[farmer.id] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expandedFarmers[farmer.id] && (
                <div className="p-4 space-y-4">
                  {farmer.farms.length === 0 && (
                    <p className="text-gray-400 italic">
                      No farms registered for this farmer.
                    </p>
                  )}

                  {farmer.farms.map((farm) => (
                    <div
                      key={farm.id}
                      className="bg-gray-50 p-3 rounded-md border border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            {farm.farmName}
                          </span>
                          <span className="text-sm text-gray-500">
                            - {farm.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFarmId(farm.id);
                              setOpenModal("field");
                            }}
                            className="py-1 px-2 text-xs rounded-md font-medium text-blue-600 hover:text-blue-800 transition"
                          >
                            + Add Field
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectionFarmId(farm.id);
                            }}
                            className="py-1 px-2 text-xs rounded-md font-medium text-indigo-600 hover:text-indigo-800 transition"
                          >
                           <div className="flex gap-1">
                          

                       <Icon as={FaRocket}  />


                            <p>Start Inspection</p>

                           </div>
                          </button>
                        </div>
                      </div>

                      {farm.fields.length === 0 ? (
                        <p className="mt-2 ml-4 text-sm text-gray-400 italic">
                          No fields registered for this farm.
                        </p>
                      ) : (
                        <ul className="mt-2 ml-4 list-disc space-y-1 text-gray-600">
                          {farm.fields.map((field) => (
                            <li key={field.id}>
                              <strong>{field.name}</strong> - {field.crop} (
                              {field.areaHa} Ha)
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

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

        <InspectionModal
          isOpen={!!inspectionFarmId}
          onClose={() => {
            setInspectionFarmId(null);
            fetchFarmers();
          }}
          farmId={inspectionFarmId}
        />
      </div>
    </div>
  );
};

export default Farmers;
