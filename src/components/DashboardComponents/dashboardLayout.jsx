import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render nested routes
import DashboardSidebar from "./dashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 bg-gray-50 p-6 mt-10 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
