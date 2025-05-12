import React, { useState } from "react";
import logo from "../assets/logo_bg_removed.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navItems = [
    { label: "Features", href: "#feature" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonial" },
  ];

  return (
    <nav className="sticky top-0 z-50 pb-2 text-black backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img className="h-[7rem] rounded-sm w-[14rem] " src={logo} alt="Company Logo" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-10 ml-10">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="hover:text-[#0FA644] transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="#"
            className="py-2 px-4 border border-[#F2F2F2] rounded-md hover:bg-[#2E8C4F] hover:text-white transition-all"
          >
            Sign In
          </a>
          <a
            href="#"
            className="py-2 px-4 bg-gradient-to-r from-[#0FA644] to-[#2E8C4F] text-white rounded-md shadow hover:opacity-90 transition"
          >
            Create an Account
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleNavbar} className="text-[#F2F2F2]">
            {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden mt-4 bg-[#2D3FA6] rounded-lg shadow-md py-6 px-8 space-y-4">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block text-lg hover:text-[#0FA644] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-3 mt-6">
            <a
              href="#"
              className="py-2 px-4 border border-[#F2F2F2] rounded-md text-center hover:bg-[#2E8C4F] hover:text-white transition"
            >
              Sign In
            </a>
            <a
              href="#"
              className="py-2 px-4 bg-gradient-to-r from-[#0FA644] to-[#2E8C4F] text-white text-center rounded-md shadow hover:opacity-90 transition"
            >
              Create an Account
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
