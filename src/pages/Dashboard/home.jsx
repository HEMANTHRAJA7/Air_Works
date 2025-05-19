import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  ArrowRight,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "react-feather";

function Dashboard() {
  // NRC data
  const nrcData = {
    total: 100,
    accepted: 30,
    rejected: 10,
    pending: 60,
  };

  // Data for pie chart
  const pieData = [
    { name: "Accepted", value: nrcData.accepted, color: "#0FA644" }, // green
    { name: "Rejected", value: nrcData.rejected, color: "#EF4444" }, // red
    { name: "Pending", value: nrcData.pending, color: "#2D3FA6" }, // blue
  ];

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const [showAll, setShowAll] = useState(false);

  const activities = [
    {
      id: "NRC-1001",
      status: "Accepted",
      color: "green",
      note: "Approved by John Doe",
      updatedDaysAgo: 1,
    },
    {
      id: "NRC-1002",
      status: "Rejected",
      color: "red",
      note: "Rejected by Jane Smith",
      updatedDaysAgo: 2,
    },
    {
      id: "NRC-1003",
      status: "Pending",
      color: "blue",
      note: "Awaiting review",
      updatedDaysAgo: 3,
    },
    {
      id: "NRC-1004",
      status: "Accepted",
      color: "green",
      note: "Approved by John Doe",
      updatedDaysAgo: 4,
    },
    {
      id: "NRC-1005",
      status: "Rejected",
      color: "red",
      note: "Rejected by Jane Smith",
      updatedDaysAgo: 5,
    },
    {
      id: "NRC-1006",
      status: "Pending",
      color: "blue",
      note: "Awaiting review",
      updatedDaysAgo: 6,
    },
    {
      id: "NRC-1007",
      status: "Accepted",
      color: "green",
      note: "Approved by John Doe",
      updatedDaysAgo: 7,
    },
  ];

  const visibleActivities = showAll ? activities : activities.slice(0, 5);
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="bg-[#0FA644] w-[10px] h-[10px] rounded-[50%]"></div>
        );
      case "Rejected":
        return (
          <div className="bg-red-500 w-[10px] h-[10px] rounded-[50%]"></div>
        );
      case "Pending":
        return (
          <div className="bg-[#2D3FA6] w-[10px] h-[10px] rounded-[50%]"></div>
        );
      default:
        return null;
    }
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind 'sm' = 640px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">NRC Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 bg-[#2D3FA6] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Export Report
              </button>
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Total NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <FileText className="h-6 w-6 text-[#2D3FA6]" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total NRC
                    </dt>
                    <dd>
                      <div className="text-3xl font-semibold text-[#2D3FA6]">
                        {nrcData.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View all NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Accepted NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-[#0FA644]" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Accepted NRC
                    </dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">
                        {nrcData.accepted}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-[#0FA644] hover:text-green-800"
                >
                  View accepted NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Rejected NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Rejected NRC
                    </dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">
                        {nrcData.rejected}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                >
                  View rejected NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Pending NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending NRC
                    </dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">
                        {nrcData.pending}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-800"
                >
                  View pending NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            NRC Status Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={
                    !isSmallScreen
                      ? ({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                      : false
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white mt-7 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {visibleActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start justify-between gap-4 border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-base text-gray-800">
                      {activity.id}
                    </p>
                    <p className="text-sm text-gray-500">{activity.note}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {activity.updatedDaysAgo}d ago
                </p>
              </li>
            ))}
          </ul>
          {activities.length > 5 && (
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[#2D3FA6] hover:underline text-sm flex items-center gap-1"
              >
                {showAll ? "Show Less" : "Show More"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
