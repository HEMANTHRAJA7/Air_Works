import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.jpg"
import LogoOnly from "../../assets/logo_only.png"
import { Home, Eye, User, Settings, FileText, Bell, Activity, LogOut, Menu, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setCollapsed(true);
      }
    };
    // Get Initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generalMenu = [
    { to: "/dashboard/home", label: "Dashboard", icon: Home },
    { to: "/dashboard/view-nrc", label: "View NRC", icon: Eye },
    { to: "/dashboard/routine-card", label: "Routine Card", icon: Calendar },
  ];

  const extraMenu = [
    { to: "/dashboard/reports", label: "Reports", icon: FileText },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/activity-log", label: "Activity Log", icon: Activity },
  ];

  const userMenu = [
    { to: "/dashboard/profile", label: "Profile", icon: User },
    { to: "/dashboard/settings", label: "Settings", icon: Settings },
    { to: "/logout", label: "Logout", icon: LogOut },
  ];

  const renderNavLink = ({ to, label, icon: Icon }) => (
    <NavLink
      key={to}
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-md transition ${
          isActive
            ? "bg-[#2D3FA6] text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
      title={collapsed ? label : ""}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Navbar (logo + toggle button) */}
      <header className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b border-gray-300 px-4 h-14 z-50">
        <img src={Logo} alt="logo" className="h-8 object-contain" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? (
            <X className="w-7 h-7 text-gray-700" />
          ) : (
            <Menu className="w-7 h-7 text-gray-700" />
          )}
        </button>
      </header>

      {/* Sidebar with fixed positioning */}
      <aside
        className={`fixed top-0 left-0 h-[100%] bg-white border-r border-gray-300 
          transform transition-all duration-300 ease-in-out z-40
          md:translate-x-0 flex flex-col
          ${sidebarOpen ? "translate-x-0 pt-[56px]" : "-translate-x-full"}
          ${collapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-300 hidden md:flex md:justify-center">
          {collapsed ? (
            <img className="h-8 w-8 object-contain" src={LogoOnly} alt="logo" />
          ) : (
            <img className="w-full object-contain" src={Logo} alt="logo" />
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-white border border-gray-300 rounded-full p-1 shadow-md z-50"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-700" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {/* Menu Sections with overflow handling */}
        <nav className={`flex flex-col p-4 ${collapsed ? 'px-2' : 'px-4'} gap-6 overflow-y-auto flex-grow`}>
          {/* General Section */}
          <div>
            {!collapsed && (
              <h4 className="mb-2 px-3 text-gray-500 uppercase text-xs font-semibold tracking-wide">
                General
              </h4>
            )}
            <div className="flex flex-col gap-2">
              {generalMenu.map(renderNavLink)}
            </div>
          </div>

          {/* Extra Section */}
          <div>
            {!collapsed && (
              <h4 className="mb-2 px-3 text-gray-500 uppercase text-xs font-semibold tracking-wide">
                Extra
              </h4>
            )}
            <div className="flex flex-col gap-2">
              {extraMenu.map(renderNavLink)}
            </div>
          </div>

          {/* User Section */}
          <div>
            {!collapsed && (
              <h4 className="mb-2 px-3 text-gray-500 uppercase text-xs font-semibold tracking-wide">
                Account
              </h4>
            )}
            <div className="flex flex-col gap-2">
              {userMenu.map(renderNavLink)}
            </div>
          </div>
        </nav>
      </aside>

      {/* This div creates space for the sidebar in the layout */}
      <div className={`hidden md:block ${collapsed ? 'md:w-16' : 'md:w-64'}`}></div>
    </>
  );
};

export default DashboardSidebar;