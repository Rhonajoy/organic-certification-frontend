import { useState } from "react";
import { auth } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Modal from "../app/Modal";
import Loader from "../app/Loader";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setSuccessModalOpen(false);
    setErrorModalOpen(false);
    setErrorMessage("");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      setErrorModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Google login failed.");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleEmailLogin}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Sign in</h2>
          <p className="text-gray-500 mb-8">
            Welcome back! Please enter your details.
          </p>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 mb-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 flex items-center justify-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.4-1.4-34.3-4.1-50.5H272v95.5h146.9c-6.4 34.5-25.6 63.7-54.6 83.3v68h88.4c51.8-47.7 81.8-118.1 81.8-196.3z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272 544.3c73.8 0 135.8-24.5 181.1-66.5l-88.4-68c-24.5 16.4-55.9 26.2-92.7 26.2-71.2 0-131.5-48-153-112.3H28.6v70.5c45.4 90.4 138.8 150.1 243.4 150.1z"
                    fill="#34a853"
                  />
                  <path
                    d="M119 323.7c-10.4-30.5-10.4-63.2 0-93.7V159.5H28.6c-36.5 72.9-36.5 159.8 0 232.7L119 323.7z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272 107.7c39.9-.6 78 14 107.3 40.3l80.1-80.1C407.9 24.5 345.9 0 272 0 167.4 0 74 59.7 28.6 150.1l90.4 70.5C140.5 155.7 200.8 107.7 272 107.7z"
                    fill="#ea4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
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
            Logged in successfully!
          </h3>
          <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={errorModalOpen} onClose={handleCloseModal} title="Error">
        <div className="text-center py-6">
          <FaTimesCircle className="mx-auto text-red-600 text-5xl mb-2" />
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            Login Failed
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

      {/* Loader Modal (optional, if you want a loader modal instead of inline button text) */}
      {loading && (
        <Modal isOpen={loading} onClose={() => {}} title="Processing">
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default LogIn;
