import { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "../app/Loader";
import Modal from "../app/Modal";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setSuccessModalOpen(false);
    setErrorModalOpen(false);
    setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      setErrorMessage("Please fill all fields.");
      setErrorModalOpen(true);
      return;
    }

    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      setErrorModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        navigate("/login");
      }, 1500);

      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed.");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Create an account
          </h2>
          <p className="text-gray-500 mb-8">
            Join our Organic Agronomist community! Please fill in your details to get started.
          </p>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-green-600 hover:text-green-700">
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={successModalOpen}
        onClose={handleCloseModal}
        title="Success"
      >
        <div className="text-center py-6">
          <FaCheckCircle className="mx-auto text-green-600 text-5xl mb-2" />
          <h3 className="text-2xl font-semibold text-green-600 mb-2">
            Account created successfully!
          </h3>
          <p className="text-gray-600 mb-4">Redirecting to login...</p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={errorModalOpen}
        onClose={handleCloseModal}
        title="Error"
      >
        <div className="text-center py-6">
          <FaTimesCircle className="mx-auto text-red-600 text-5xl mb-2" />
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            Registration Failed
          </h3>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Loader Modal (optional) */}
      {loading && (
        <Modal isOpen={loading} onClose={() => {}} title="Processing">
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default Register;
