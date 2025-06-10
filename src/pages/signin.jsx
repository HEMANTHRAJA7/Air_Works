const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Form container */}
      <div className="w-full max-w-md px-6 sm:px-8">
        <form
          className="w-full 
              bg-white 
              shadow-xl 
              border 
              border-gray-200 
              rounded-xl 
              p-8"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Sign In
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-gray-700 text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-700 text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-left">
              <p className="text-blue-600 text-base">
                Forgot Password? &nbsp;
                <a
                  href="/forgot-password"
                  className="font-bold hover:underline transition-colors"
                >
                  Click here
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-lg"
            >
              Sign In
            </button>
            <div className="text-center space-y-2">
              <p className="text-blue-600 text-base">
                Don't have an account? &nbsp;
                <a
                  href="/createAccount"
                  className="font-bold hover:underline transition-colors"
                >
                  Create account
                </a>
              </p>
              <p className="text-blue-600 text-base">
                Employee Sign In: &nbsp;
                <a
                  href="#"
                  className="font-bold hover:underline transition-colors"
                >
                  Click here
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center bg-[#2D3FA6] border-t border-gray-200 py-4">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} Air Works. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Signin;
