import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/LandingPage/home";
import Signin from "./pages/signin";
import CreateAccount from "./pages/createAccount";

// dashboard
import DashboardLayout from "./components/DashboardComponents/dashboardLayout";
import HomeDashboard from "./pages/Dashboard/home"; 
import ViewNRC from "./pages/Dashboard/viewNRC";    
import Reports from "./pages/Dashboard/reports";
import Notifications from "./pages/Dashboard/notifications";
import ActivityLog from "./pages/Dashboard/activityLog";
import Profile from "./pages/Dashboard/profile";
import Settings from "./pages/Dashboard/settings";
import NrcDetail from "./components/DashboardComponents/NrcModel"


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
          <Route path="view-nrc/:nrcId" element={<NrcDetail />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
