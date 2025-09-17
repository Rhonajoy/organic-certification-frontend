
const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Create an account
        </h2>
        <p className="text-gray-500 mb-8">
          Join our Organic Farmers community! Please fill in your details to get
          started.
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
