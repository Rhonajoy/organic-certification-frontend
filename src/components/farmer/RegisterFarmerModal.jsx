import { useState } from "react";
import Modal from "../app/Modal";
import Loader from "../app/Loader";
import { createFarmer } from "../../utils/api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterFarmerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createFarmer({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        county: formData.county,
      });

      setSuccess(true);
      setFormData({});
      toast.success("Farmer registered successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
      setSuccess(false);
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
    <>
     
      <Modal isOpen={isOpen} onClose={handleClose} title="Register New Farmer">
        {loading ? (
          <Loader />
        ) : success ? (
          <div className="text-center py-6">
            <FaCheckCircle className="mx-auto text-green-600 text-5xl mb-2" />
            <h3 className="text-2xl font-semibold text-green-600 mb-2">
              Farmer Registered Successfully!
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
              <label className="block text-sm">Phone Number</label>
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
                Register
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default RegisterFarmerModal;
