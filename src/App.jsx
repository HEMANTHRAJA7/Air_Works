import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/LandingPage/home";
import Signin from "./pages/signin";
import CreateAccount from "./pages/createAccount";

// dashboard
import DashboardLayout from "./components/DashboardComponents/dashboardLayout";
import HomeDashboard from "./pages/Dashboard/home"; // or HomeDashboard.js
import ViewNRC from "./pages/Dashboard/viewNRC";    // or ViewNRC.js

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeDashboard />} />
          <Route path="view-nrc" element={<ViewNRC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
