import  { useState } from "react";
import Modal from "../app/Modal";
import Loader from "../app/Loader";
import { createFarm } from "../../utils/api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterFarmModal = ({ isOpen, onClose, farmerId, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createFarm({ ...formData, farmerId });
      setSuccess(true);
      setFormData({});
      toast.success("Farm registered successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err?.response?.data?.message || "An unexpected error occurred.";
      setError(msg);
      setSuccess(false);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Register Farm">
      {loading ? (
        <Loader />
      ) : success ? (
        <div className="text-center py-6">
          <FaCheckCircle className="mx-auto text-green-600 text-5xl mb-2" />
          <h3 className="text-2xl font-semibold text-green-600 mb-2">
            Farm Registered Successfully!
          </h3>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center text-red-500 space-x-2">
              <FaTimesCircle />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm">Farm Name</label>
            <input
              type="text"
              name="farmName"
              placeholder="Farm Name"
              value={formData.farmName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Area (Ha)</label>
            <input
              type="number"
              name="areaHa"
              placeholder="Area (Ha)"
              value={formData.areaHa || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RegisterFarmModal;
