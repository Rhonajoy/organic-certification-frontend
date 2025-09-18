import React, { useState } from 'react';
import Modal from '../app/Modal';

const RegisterFarmerModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


 const handleNext = async (type, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createRecord(type, data);
      setFormData({ ...formData, ...data, [`${type}Id`]: result.id });
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
      const result = await createRecord('field', data);
      console.log('Final Data Submitted:', { ...formData, ...data, fieldId: result.id });
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
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleNext({ /* get farmer data here */ }); }}>
            <h3 className="text-xl font-semibold mb-4">Register Farmer</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="fullName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Cancel</button>
              <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">Next</button>
            </div>
          </form>
        );
      case 2:
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleNext({ /* get farm data here */ }); }}>
            <h3 className="text-xl font-semibold mb-4">Register Farm</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="farmName" className="block text-sm font-medium text-gray-700">Farm Name</label>
                <input type="text" id="farmName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" id="location" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <div className="flex justify-between space-x-2 mt-6">
              <button type="button" onClick={handleBack} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Back</button>
              <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">Next</button>
            </div>
          </form>
        );
      case 3:
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit({ /* get field data here */ }); }}>
            <h3 className="text-xl font-semibold mb-4">Register Field</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">Field Name</label>
                <input type="text" id="fieldName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="fieldSize" className="block text-sm font-medium text-gray-700">Field Size</label>
                <input type="number" id="fieldSize" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <div className="flex justify-between space-x-2 mt-6">
              <button type="button" onClick={handleBack} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Back</button>
              <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">Submit</button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Farmer">
      {renderFormStep()}
    </Modal>
  );
};

export default RegisterFarmerModal;