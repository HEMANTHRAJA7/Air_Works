import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/LandingPage/home";
import Signin from "./pages/signin";
import CreateAccount from "./pages/createAccount";

// dashboard
import DashboardLayout from "./components/DashboardComponents/layout/dashboardLayout";
import HomeDashboard from "./pages/Dashboard/home/Home"; 
import Reports from "./pages/Dashboard/Reports";
import Notifications from "./pages/Dashboard/Notifications";
import ActivityLog from "./pages/Dashboard/ActivityLog";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import NrcDetail from "./pages/Dashboard/view-nrc/NrcDetails"
import ViewNRC from "./pages/Dashboard/view-nrc/ViewNRC"
import RcDetails from "./pages/Dashboard/routine-card/RcDetails"
import RoutineCard from "./pages/Dashboard/routine-card/ViewRC"; 


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
          <Route path="routine-card" element={<RoutineCard />} />
          <Route path="routine-card/:rcId" element={<RcDetails />} />
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
