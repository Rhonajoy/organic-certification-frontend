import React, { useState } from "react";
import Modal from "../app/Modal";
import Loader from "../app/Loader";
import { createFarmer, createFarm, createField } from "../../utils/api";

const RegisterFarmerModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = async (type, data) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (type === "farmer") result = await createFarmer(data);
      if (type === "farm") result = await createFarm(data);

      setFormData({ ...formData, ...data, [`${type}Id`]: result.data.id });
      setCurrentStep(currentStep + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setError(null);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createField(data);
      console.log("Final Data Submitted:", {
        ...formData,
        ...data,
        fieldId: result.data.id,
      });
      onClose();
      setCurrentStep(1);
      setFormData({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormStep = () => {
    if (loading) {
      return <Loader />;
    }

    switch (currentStep) {
      case 1:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext("farmer", {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                county: formData.county,
              });
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Phone Number </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">County</label>
                <input
                  type="text"
                  name="county"
                  value={formData.county || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Next
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext("farm", {
                farmName: formData.farmName,
                location: formData.location,
                areaHa:formData.areaHa,
                farmerId: formData.farmerId,  
              });
            }}
          >
            <h3 className="text-xl font-semibold mb-4">Register Farm</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
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
                  value={formData.location }
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Area (in hectares)</label>
                <input
                  type="number"
                  id="areaHa"
                  name="areaHa"
                  value={formData.areaHa}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="Enter area in hectares"
                   className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Next
              </button>
            </div>
          </form>
        );

      case 3:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({
                name: formData.fieldName,
                crop:formData.crop,
                areaHa: formData.fieldSize,
                farmId:formData.farmId

              });
            }}
          >
            <h3 className="text-xl font-semibold mb-4">Register Field</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Field Name</label>
                <input
                  type="text"
                  name="fieldName"
                  value={formData.fieldName || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Crop</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Field Size(Area Ha)</label>
                <input
                  type="number"
                  name="fieldSize"
                  value={formData.fieldSize || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Farmer">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {renderFormStep()}
    </Modal>
  );
};

export default RegisterFarmerModal;
