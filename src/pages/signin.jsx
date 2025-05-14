import React from "react";
import Image from "../assets/draw.jpg";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content container */}
      <div className="flex-grow w-full flex items-center justify-center lg:justify-start relative overflow-hidden">
        {/* Background image - only visible on lg screens and above */}
        <div className="absolute inset-0 w-full h-full bg-sky-400 hidden lg:block">
          <div
            className={`absolute inset-0 bg-[url(${Image})] bg-cover bg-center bg-no-repeat bg-fixed`}
          />
        </div>

        {/* Form container */}
        <div className="w-full max-w-md px-6 sm:px-8 lg:px-0 lg:ml-[10%] z-10">
          <form
            className="w-full 
                        bg-white 
                        shadow-md 
                        border 
                        border-gray-200 
                        rounded-xl 
                        p-8 
                        lg:bg-white/10 
                        lg:backdrop-blur-lg 
                        lg:border-white/30 
                        lg:shadow-2xl"
          >
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 lg:text-white">
              Sign In
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 lg:text-white text-lg"
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
                  className="block text-gray-700 lg:text-white text-lg"
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

              <div className="text-left ">
                <p className="text-blue-600 lg:text-white text-base">
                  Forgot Password? &nbsp;
                  <span>
                    <a
                      href="/forgot-password"
                      className="text-blue-600 font-bold hover:underline lg:text-white lg:hover:text-blue-100 transition-colors"
                    >
                      Click here
                    </a>
                  </span>
                </p>
                <p className="text-blue-600 lg:text-white text-base">
                  Don't have an account? &nbsp;
                  <span>
                    <a
                      href="/login"
                      className="text-blue-600 font-bold hover:underline lg:text-white lg:hover:text-blue-100 transition-colors"
                    >
                      Log In
                    </a>
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D3FA6] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center bg-[#2D3FA6] border-t border-gray-200 py-4">
        <p className="text-sm text-gray-600 text-white">
          © {new Date().getFullYear()} Air Works. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
