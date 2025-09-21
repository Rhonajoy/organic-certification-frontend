// RegisterFieldModal.js
import React, { useState } from "react";
import Modal from "../app/Modal";
import Loader from "../app/Loader";
import { createField } from "../../utils/api";

const RegisterFieldModal = ({ isOpen, onClose, farmId }) => {
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
      await createField({ ...formData, farmId });
      onClose();
      setFormData({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Field">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Field Name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="crop"
            placeholder="Crop"
            value={formData.crop || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            name="areaHa"
            placeholder="Size (Ha)"
            value={formData.areaHa || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
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

export default RegisterFieldModal;
