

const LogIn = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Sign in</h2>
        <p className="text-gray-500 mb-8">
          Welcome back! Please enter your details.
        </p>

        <div className="w-full">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 justify-self-end"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 justify-self-end"
          >
            Password*
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="flex items-center justify-between mt-6 mb-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LogIn;
