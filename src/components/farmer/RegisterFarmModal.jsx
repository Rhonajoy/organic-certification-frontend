// RegisterFarmModal.js
import React, { useState } from "react";
import Modal from "../app/Modal";
import Loader from "../app/Loader";
import { createFarm } from "../../utils/api";

const RegisterFarmModal = ({ isOpen, onClose, farmerId, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await createFarm({ ...formData, farmerId });
      onSuccess(result.data.id); // return farmId
      onClose();
      setFormData({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Farm">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="farmName"
            placeholder="Farm Name"
            value={formData.farmName || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            name="areaHa"
            placeholder="Area (Ha)"
            value={formData.areaHa || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RegisterFarmModal;
