import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertCircle,
  UserCheck,
} from "lucide-react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      calculatePasswordStrength(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Full name is required";
        } else if (value.trim().length < 3) {
          newErrors.fullName = "Name must be at least 3 characters";
        } else {
          newErrors.fullName = "";
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, ""))) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          newErrors.phone = "";
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          newErrors.email = "";
        }
        break;
      case "username":
        if (!value.trim()) {
          newErrors.username = "Username is required";
        } else if (value.trim().length < 4) {
          newErrors.username = "Username must be at least 4 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username =
            "Username can only contain letters, numbers and underscore";
        } else {
          newErrors.username = "";
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
          newErrors.password =
            "Password must contain uppercase, lowercase and numbers";
        } else {
          newErrors.password = "";
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setPasswordStrength(Math.min(score, 5));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    return "Strong";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let formIsValid = true;
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        formIsValid = false;
      }
    });

    if (formIsValid) {
      // Form submission logic would go here
      console.log("Form submitted:", formData);
      alert("Account created successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form title and info */}
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8 md:border-r md:border-gray-200">
              <h2 className="text-3xl font-bold text-[#2D3FA6] mb-4">
                Create an account
              </h2>
              <p className="text-gray-600 mb-6">
                Join Air Works to get the best care for your aircrafts.
              </p>

              <div className="space-y-4 hidden md:block">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    Lorem ipsum
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Lorem ipsum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    Lorem ipsum
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-2/3 md:pl-8">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("fullName")}
                      className={`w-full border ${
                        touched.fullName && errors.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full border ${
                        touched.phone && errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      className={`w-full border ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* User Name */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onBlur={() => handleBlur("username")}
                      className={`w-full border ${
                        touched.username && errors.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Choose a username"
                    />
                  </div>
                  {touched.username && errors.username && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      className={`w-full border ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className={`h-full rounded-full ${getStrengthColor()}`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`text-xs ${
                            passwordStrength <= 1
                              ? "text-red-500"
                              : passwordStrength <= 3
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {getStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                  {touched.password && errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      className={`w-full border ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3FA6]`}
                      placeholder="Re-enter your password"
                    />
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="md:col-span-2 mt-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-[#2D3FA6] border-gray-300 rounded focus:ring-[#2D3FA6]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{" "}
                        <a href="#" className="text-[#2D3FA6] hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#2D3FA6] hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#2D3FA6] hover:bg-[#1e2d7b] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              {/* Already have account line */}
              <div className="text-center mt-6 border-t border-gray-200 pt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="text-[#2D3FA6] hover:underline font-medium"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2D3FA6] py-6">
        <div className=" text-center">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Air Works. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignupForm;
