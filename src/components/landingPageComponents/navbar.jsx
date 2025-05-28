import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_bg_removed.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  // Reference for mobile menu
  const mobileMenuRef = useRef(null);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleScroll = () => {
    // This function is kept for future use if scroll-based logic is needed
  };

  // Close the mobile menu if click happens outside
  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setMobileDrawerOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside); // Listen for click outside

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []);

  const navItems = [
    { label: "Features", href: "#feature" },
    { label: "Workflow", href: "#workflow" },
    { label: "Services", href: "#services" },
    { label: "Customers", href: "#customers" },
  ];

  return (
    <nav className="sticky top-0 z-50  backdrop-blur-md bg-white/20 shadow-md transition-all duration-300 p-5">
      <div className="container mx-auto flex justify-between items-center px-4 transition-all duration-300">
        {/* Logo */}
        <div>
          <img
            className="object-contain w-[7rem] transition-transform duration-300"
            src={logo}
            alt="Company Logo"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 ml-6">
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
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="/signin"
            className="py-1 px-3 border border-black rounded-md hover:bg-[#2E8C4F] hover:border-white hover:text-white transition-all"
          >
            Sign In
          </a>
          <a
            href="/createAccount"
            className="py-1 px-3 bg-gradient-to-r from-[#0FA644] to-[#2E8C4F] text-white rounded-md shadow hover:opacity-90 transition"
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
        <div
          ref={mobileMenuRef}
          className=" lg:hidden mx-4 mt-2 bg-[#2D3FA6] rounded-lg shadow-md py-4 px-6 space-y-4 transform transition-transform duration-300 ease-in-out translate-x-0"
        >
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
              href="/signin"
              className="block text-white border border-white px-4 py-2 rounded-md text-center hover:bg-white hover:text-[#2D3FA6] transition"
            >
              Sign In
            </a>
            <a
              href="/createAccount"
              className="block text-center px-4 py-2 bg-white text-[#2D3FA6] rounded-md shadow hover:opacity-90 transition"
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
