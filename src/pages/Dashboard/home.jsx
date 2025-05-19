"use client"

import { useState, useEffect } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"
import {
  ArrowRight,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Bell,
  User,
  Menu,
  Home,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  Calendar,
  PieChartIcon,
  Layers,
  Activity,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
} from "lucide-react"

function Dashboard() {
  // State for sidebar toggle on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // State for notifications dropdown
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // State for user dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // State for active tab
  const [activeTab, setActiveTab] = useState("overview")

  // State for time period filter
  const [timePeriod, setTimePeriod] = useState("This Week")

  // State for show all activities
  const [showAll, setShowAll] = useState(false)

  // State for screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // NRC data
  const nrcData = {
    total: 1248,
    accepted: 742,
    rejected: 186,
    pending: 320,
    growth: 24.5,
    target: 1500,
  }

  // Monthly trend data
  const monthlyTrendData = [
    { name: "Jan", total: 420, accepted: 300, rejected: 40, pending: 80 },
    { name: "Feb", total: 520, accepted: 350, rejected: 70, pending: 100 },
    { name: "Mar", total: 620, accepted: 400, rejected: 90, pending: 130 },
    { name: "Apr", total: 720, accepted: 450, rejected: 110, pending: 160 },
    { name: "May", total: 820, accepted: 500, rejected: 120, pending: 200 },
    { name: "Jun", total: 920, accepted: 550, rejected: 150, pending: 220 },
    { name: "Jul", total: 1020, accepted: 600, rejected: 170, pending: 250 },
    { name: "Aug", total: 1120, accepted: 650, rejected: 180, pending: 290 },
    { name: "Sep", total: 1220, accepted: 700, rejected: 190, pending: 330 },
    { name: "Oct", total: 1248, accepted: 742, rejected: 186, pending: 320 },
  ]

  // Daily trend data
  const dailyTrendData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 150 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 210 },
    { name: "Fri", value: 190 },
    { name: "Sat", value: 160 },
    { name: "Sun", value: 140 },
  ]

  // Department distribution data
  const departmentData = [
    { name: "Engineering", value: 35 },
    { name: "Marketing", value: 25 },
    { name: "Sales", value: 20 },
    { name: "Finance", value: 15 },
    { name: "HR", value: 5 },
  ]

  // Data for pie chart
  const pieData = [
    { name: "Accepted", value: nrcData.accepted, color: "#10B981" }, // green
    { name: "Rejected", value: nrcData.rejected, color: "#EF4444" }, // red
    { name: "Pending", value: nrcData.pending, color: "#3B82F6" }, // blue
  ]

  // Top performers data
  const topPerformers = [
    { name: "Rakesh Kumar", department: "Engineering", count: 87, rating: 4.9 },
    { name: "Priya Sharma", department: "Marketing", count: 76, rating: 4.8 },
    { name: "Aryan Singh", department: "Sales", count: 72, rating: 4.7 },
    { name: "Neha Patel", department: "Finance", count: 65, rating: 4.6 },
    { name: "Vikram Mehta", department: "Engineering", count: 61, rating: 4.5 },
  ]

  // Recent activities data
  const activities = [
    {
      id: "NRC-1001",
      title: "New NRC Submission",
      status: "Accepted",
      color: "green",
      note: "Approved by Rakesh Kumar",
      department: "Engineering",
      updatedDaysAgo: 1,
      priority: "High",
    },
    {
      id: "NRC-1002",
      title: "Process Improvement Suggestion",
      status: "Rejected",
      color: "red",
      note: "Rejected by Aryan Singh - Not feasible",
      department: "Operations",
      updatedDaysAgo: 2,
      priority: "Medium",
    },
    {
      id: "NRC-1003",
      title: "Cost Reduction Initiative",
      status: "Pending",
      color: "blue",
      note: "Awaiting review from Finance team",
      department: "Finance",
      updatedDaysAgo: 3,
      priority: "High",
    },
    {
      id: "NRC-1004",
      title: "Safety Protocol Update",
      status: "Accepted",
      color: "green",
      note: "Approved by Aryan Singh - Implementing next week",
      department: "Safety",
      updatedDaysAgo: 4,
      priority: "Critical",
    },
    {
      id: "NRC-1005",
      title: "New Vendor Proposal",
      status: "Rejected",
      color: "red",
      note: "Rejected by Pranav Gupta - Cost concerns",
      department: "Procurement",
      updatedDaysAgo: 5,
      priority: "Low",
    },
    {
      id: "NRC-1006",
      title: "Employee Wellness Program",
      status: "Pending",
      color: "blue",
      note: "Awaiting review from HR department",
      department: "HR",
      updatedDaysAgo: 6,
      priority: "Medium",
    },
    {
      id: "NRC-1007",
      title: "IT Infrastructure Upgrade",
      status: "Accepted",
      color: "green",
      note: "Approved by Pranav Gupta - Scheduled for next month",
      department: "IT",
      updatedDaysAgo: 7,
      priority: "High",
    },
    {
      id: "NRC-1008",
      title: "Marketing Campaign Proposal",
      status: "Pending",
      color: "blue",
      note: "Under review by Marketing team",
      department: "Marketing",
      updatedDaysAgo: 2,
      priority: "High",
    },
    {
      id: "NRC-1009",
      title: "Supply Chain Optimization",
      status: "Accepted",
      color: "green",
      note: "Approved by Logistics head - Implementation in progress",
      department: "Logistics",
      updatedDaysAgo: 3,
      priority: "Medium",
    },
    {
      id: "NRC-1010",
      title: "Customer Feedback System",
      status: "Pending",
      color: "blue",
      note: "Awaiting IT department resources",
      department: "Customer Service",
      updatedDaysAgo: 4,
      priority: "Medium",
    },
  ]

  // Notifications data
  const notifications = [
    {
      id: 1,
      title: "New NRC Submission",
      message: "Rakesh Kumar submitted a new NRC for review",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "NRC Approved",
      message: "Your NRC-1004 was approved by the review committee",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Reminder: Review Pending",
      message: "You have 5 NRCs pending for review",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "System Update",
      message: "NRC Dashboard will be updated tonight at 2 AM",
      time: "Yesterday",
      read: true,
    },
  ]

  const visibleActivities = showAll ? activities : activities.slice(0, 5)

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="flex items-center">
            <div className="bg-emerald-500 w-2.5 h-2.5 rounded-full mr-2"></div>
            <span className="text-emerald-500 font-medium">Accepted</span>
          </div>
        )
      case "Rejected":
        return (
          <div className="flex items-center">
            <div className="bg-red-500 w-2.5 h-2.5 rounded-full mr-2"></div>
            <span className="text-red-500 font-medium">Rejected</span>
          </div>
        )
      case "Pending":
        return (
          <div className="flex items-center">
            <div className="bg-blue-500 w-2.5 h-2.5 rounded-full mr-2"></div>
            <span className="text-blue-500 font-medium">Pending</span>
          </div>
        )
      default:
        return null
    }
  }

  // Get priority badge based on priority
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "Critical":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Critical</span>
      case "High":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">High</span>
      case "Medium":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Medium</span>
      case "Low":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Low</span>
      default:
        return null
    }
  }

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
          <p className="font-medium text-gray-900">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-500">{`${((payload[0].value / nrcData.total) * 100).toFixed(1)}% of total`}</p>
        </div>
      )
    }
    return null
  }

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen || userMenuOpen) {
        if (!event.target.closest(".dropdown-container")) {
          setNotificationsOpen(false)
          setUserMenuOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notificationsOpen, userMenuOpen])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div
        className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4`}
      >
        <div className="flex items-center justify-center flex-shrink-0 px-6">
          <div className="h-8 w-auto flex items-center space-x-2">
            <Layers className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NRC Dashboard</span>
          </div>
        </div>
        <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
          {/* Navigation */}
          <nav className="px-3 mt-6">
            <div className="space-y-1">
              <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("overview")
                }}
              >
                <Home className="mr-3 h-5 w-5 text-blue-500" />
                Overview
              </a>
              <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("analytics")
                }}
              >
                <BarChart2 className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                Analytics
              </a>
              <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("team")
                }}
              >
                <Users className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                Team
              </a>
              <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("settings")
                }}
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                Settings
              </a>
            </div>
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reports</h3>
              <div className="mt-1 space-y-1">
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <PieChartIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                  Monthly Report
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <Activity className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                  Performance
                </a>
                <a
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <TrendingUp className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
                  Growth
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="px-3 mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center px-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Rajesh Kumar</p>
              <p className="text-xs font-medium text-gray-500">Admin</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <User className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
              Your Profile
            </a>
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
              Help & Support
            </a>
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
              Sign Out
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 flex ${sidebarOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XCircle className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Layers className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NRC Dashboard</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-600"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("overview")
                  setSidebarOpen(false)
                }}
              >
                <Home className="mr-4 h-6 w-6 text-blue-500" />
                Overview
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("analytics")
                  setSidebarOpen(false)
                }}
              >
                <BarChart2 className="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500" />
                Analytics
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("team")
                  setSidebarOpen(false)
                }}
              >
                <Users className="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500" />
                Team
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("settings")
                  setSidebarOpen(false)
                }}
              >
                <Settings className="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500" />
                Settings
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">Rajesh Kumar</p>
                  <p className="text-sm font-medium text-gray-500">Admin</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex-shrink-0 w-14"></div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8 h-16">
            <div className="flex-1 flex">
              <button
                type="button"
                className="lg:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search NRC..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* Time period selector */}
              <div className="mr-4">
                <div className="relative dropdown-container">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      const newPeriod =
                        timePeriod === "This Week"
                          ? "This Month"
                          : timePeriod === "This Month"
                            ? "This Quarter"
                            : timePeriod === "This Quarter"
                              ? "This Year"
                              : "This Week"
                      setTimePeriod(newPeriod)
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    {timePeriod}
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Notification dropdown */}
              <div className="ml-4 relative dropdown-container">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* Notification dropdown panel */}
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 px-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? "" : "bg-blue-50"}`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              {notification.read ? (
                                <Bell className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Bell className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                              <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 px-3 border-t border-gray-200">
                      <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="ml-4 relative dropdown-container">
                <button
                  type="button"
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                </button>

                {/* User menu dropdown */}
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 pb-8">
          {/* Page header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">NRC Dashboard</h2>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Last updated: May 19, 2025
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <TrendingUp className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" />
                      <span className="text-green-500 font-medium">{nrcData.growth}% growth</span> from last period
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    Filter
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <RefreshCw className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    Refresh
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="-ml-1 mr-2 h-5 w-5" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 px-4 sm:px-6 lg:px-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total NRC */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total NRC</dt>
                        <dd>
                          <div className="text-3xl font-semibold text-gray-900">{nrcData.total}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="relative h-3 rounded-full overflow-hidden bg-gray-200">
                      <div
                        className="absolute h-full bg-blue-500"
                        style={{ width: `${(nrcData.total / nrcData.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Target: {nrcData.target}</span>
                      <span className="text-blue-600 font-medium">
                        {((nrcData.total / nrcData.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                      View all NRC
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Accepted NRC */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Accepted NRC</dt>
                        <dd>
                          <div className="text-3xl font-semibold text-gray-900">{nrcData.accepted}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-emerald-500">
                        {((nrcData.accepted / nrcData.total) * 100).toFixed(1)}%
                      </span>
                      <span className="ml-2 text-sm text-gray-500">of total</span>
                      <span className="ml-auto flex items-center text-sm text-green-600">
                        <TrendingUp className="mr-1.5 h-4 w-4" />
                        12.5%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                      View accepted NRC
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Rejected NRC */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                      <XCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Rejected NRC</dt>
                        <dd>
                          <div className="text-3xl font-semibold text-gray-900">{nrcData.rejected}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-red-500">
                        {((nrcData.rejected / nrcData.total) * 100).toFixed(1)}%
                      </span>
                      <span className="ml-2 text-sm text-gray-500">of total</span>
                      <span className="ml-auto flex items-center text-sm text-red-600">
                        <TrendingUp className="mr-1.5 h-4 w-4 transform rotate-180" />
                        3.2%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-red-600 hover:text-red-500 flex items-center">
                      View rejected NRC
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Pending NRC */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending NRC</dt>
                        <dd>
                          <div className="text-3xl font-semibold text-gray-900">{nrcData.pending}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-blue-500">
                        {((nrcData.pending / nrcData.total) * 100).toFixed(1)}%
                      </span>
                      <span className="ml-2 text-sm text-gray-500">of total</span>
                      <span className="ml-auto flex items-center text-sm text-yellow-600">
                        <AlertCircle className="mr-1.5 h-4 w-4" />
                        Needs attention
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                      View pending NRC
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts section */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Monthly trend chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Monthly Trend</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                        <span className="text-xs text-gray-500">Total</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 mr-1"></div>
                        <span className="text-xs text-gray-500">Accepted</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                        <span className="text-xs text-gray-500">Rejected</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-5">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyTrendData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="accepted" stackId="a" fill="#10B981" />
                        <Bar dataKey="rejected" stackId="a" fill="#EF4444" />
                        <Bar dataKey="pending" stackId="a" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Status distribution chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">NRC Status Distribution</h3>
                </div>
                <div className="px-5 py-5">
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
                            !isSmallScreen ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : false
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
              </div>
            </div>

            {/* Additional charts row */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Daily trend chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Daily Activity</h3>
                </div>
                <div className="px-5 py-5">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dailyTrendData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Department distribution chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Department Distribution</h3>
                </div>
                <div className="px-5 py-5">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Top performers section */}
            <div className="mt-8 bg-white shadow overflow-hidden rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Top Performers</h3>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="px-5 py-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {performer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{performer.name}</h4>
                          <p className="text-xs text-gray-500">{performer.department}</p>
                          <div className="mt-1 flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(performer.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                  fill={i < Math.floor(performer.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-gray-500">{performer.rating}</span>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {performer.count} NRCs
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-8 bg-white shadow overflow-hidden rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                    Add NRC
                  </button>
                </div>
              </div>
              <div className="bg-white overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {visibleActivities.map((activity) => (
                    <div key={activity.id} className="px-5 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div
                              className={`h-10 w-10 rounded-full bg-${activity.status === "Accepted" ? "green" : activity.status === "Rejected" ? "red" : "blue"}-100 flex items-center justify-center`}
                            >
                              {activity.status === "Accepted" ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : activity.status === "Rejected" ? (
                                <XCircle className="h-6 w-6 text-red-600" />
                              ) : (
                                <Clock className="h-6 w-6 text-blue-600" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium text-gray-900">{activity.id}</h4>
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                {activity.department}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{activity.title}</p>
                            <p className="mt-1 text-xs text-gray-400">{activity.note}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(activity.status)}
                            {getPriorityBadge(activity.priority)}
                          </div>
                          <span className="text-xs text-gray-500">{activity.updatedDaysAgo}d ago</span>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {activities.length > 5 && (
                  <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between">
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        Previous
                      </button>
                      <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                      >
                        {showAll ? "Show Less" : "View All"}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
