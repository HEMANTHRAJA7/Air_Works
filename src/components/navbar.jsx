import React, { useState, useEffect } from "react";
import logo from "../assets/logo_bg_removed.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", href: "#feature" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Customers", href: "#customers" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-[4rem] w-[8rem]" : "h-[7rem] w-[14rem]"
            }`}
            src={logo}
            alt="Company Logo"
          />
        </div>

        {/* Desktop Navigation */}
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

        {/* Desktop CTAs */}
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

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button onClick={toggleNavbar} className="text-[#2D3FA6]">
            {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden mx-4 mt-2 bg-[#2D3FA6] rounded-lg shadow-md py-6 px-8 space-y-4">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-white block hover:text-gray-300 transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <a
              href="#"
              className="block text-white text-center py-2 border border-white rounded-md hover:bg-white hover:text-[#2D3FA6] transition"
            >
              Sign In
            </a>
            <a
              href="#"
              className="block text-center py-2 bg-gradient-to-r from-[#0FA644] to-[#2E8C4F] text-white rounded-md hover:opacity-90 transition"
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
