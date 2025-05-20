"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ArrowRight,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

function Dashboard() {
  // State for notifications dropdown
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // State for user dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // State for screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const activitiesPerPage = 5

  // State for filter and refresh
  const [isFiltering, setIsFiltering] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    priority: "all",
    date: "all",
  })

  // Initial NRC data
  const initialNrcData = {
    total: 1248,
    accepted: 742,
    rejected: 186,
    pending: 320,
    growth: 24.5,
    reviewed: 928,
  }

  // State for NRC data
  const [nrcData, setNrcData] = useState(initialNrcData)

  // Initial monthly trend data
  const initialMonthlyTrendData = [
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

  // State for monthly trend data
  const [monthlyTrendData, setMonthlyTrendData] = useState(initialMonthlyTrendData)

  // Initial pie data
  const initialPieData = [
    { name: "Accepted", value: initialNrcData.accepted, color: "#0FA644" }, // Green
    { name: "Rejected", value: initialNrcData.rejected, color: "#EF4444" }, // Red
    { name: "Pending", value: initialNrcData.pending, color: "#27418C" }, // Changed from #27368C to #27418C
  ]

  // State for pie data
  const [pieData, setPieData] = useState(initialPieData)


  // Initial activities data
  const initialActivities = [
    {
      id: "NRC-1001",
      title: "New NRC Submission",
      status: "Accepted",
      color: "green",
      note: "Approved by Rakesh Kumar",
      updatedDaysAgo: 1,
      priority: "High",
    },
    {
      id: "NRC-1002",
      title: "Process Improvement Suggestion",
      status: "Rejected",
      color: "red",
      note: "Rejected by Aryan Singh - Not feasible",
      updatedDaysAgo: 2,
      priority: "Medium",
    },
    {
      id: "NRC-1003",
      title: "Cost Reduction Initiative",
      status: "Pending",
      color: "blue",
      note: "Awaiting review from Finance team",
      updatedDaysAgo: 3,
      priority: "High",
    },
    {
      id: "NRC-1004",
      title: "Safety Protocol Update",
      status: "Accepted",
      color: "green",
      note: "Approved by Aryan Singh - Implementing next week",
      updatedDaysAgo: 4,
      priority: "Critical",
    },
    {
      id: "NRC-1005",
      title: "New Vendor Proposal",
      status: "Rejected",
      color: "red",
      note: "Rejected by Pranav Gupta - Cost concerns",
      updatedDaysAgo: 5,
      priority: "Low",
    },
    {
      id: "NRC-1006",
      title: "Employee Wellness Program",
      status: "Pending",
      color: "blue",
      note: "Awaiting review from HR department",
      updatedDaysAgo: 6,
      priority: "Medium",
    },
    {
      id: "NRC-1007",
      title: "IT Infrastructure Upgrade",
      status: "Accepted",
      color: "green",
      note: "Approved by Pranav Gupta - Scheduled for next month",
      updatedDaysAgo: 7,
      priority: "High",
    },
    {
      id: "NRC-1008",
      title: "Marketing Campaign Proposal",
      status: "Pending",
      color: "blue",
      note: "Under review by Marketing team",
      updatedDaysAgo: 2,
      priority: "High",
    },
    {
      id: "NRC-1009",
      title: "Supply Chain Optimization",
      status: "Accepted",
      color: "green",
      note: "Approved by Logistics head - Implementation in progress",
      updatedDaysAgo: 3,
      priority: "Medium",
    },
    {
      id: "NRC-1010",
      title: "Customer Feedback System",
      status: "Pending",
      color: "blue",
      note: "Awaiting IT department resources",
      updatedDaysAgo: 4,
      priority: "Medium",
    },
  ]

  // State for activities
  const [activities, setActivities] = useState(initialActivities)

  // Filter activities based on filter options
  const filteredActivities = activities.filter((activity) => {
    const matchesStatus =
      filterOptions.status === "all" || activity.status.toLowerCase() === filterOptions.status.toLowerCase()
    const matchesPriority =
      filterOptions.priority === "all" || activity.priority.toLowerCase() === filterOptions.priority.toLowerCase()
    const matchesDate = filterOptions.date === "all" || activity.updatedDaysAgo <= Number.parseInt(filterOptions.date)

    return matchesStatus && matchesPriority && matchesDate
  })

  // Calculate pagination
  const indexOfLastActivity = currentPage * activitiesPerPage
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity)
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage)

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filterOptions])

  // Filter handler
  const handleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  // Apply filter
  const applyFilter = () => {
    setIsFiltering(true)

    // Simulate filtering process
    setTimeout(() => {
      setIsFiltering(false)
      setFilterOpen(false)
    }, 800)
  }

  // Reset filter
  const resetFilter = () => {
    setFilterOptions({
      status: "all",
      priority: "all",
      date: "all",
    })
  }

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh process with random data changes
    setTimeout(() => {
      // Generate random variations for the data
      const variation = (base) => {
        const change = Math.floor(Math.random() * 50) - 25 // Random change between -25 and +25
        return Math.max(0, base + change) // Ensure value doesn't go below 0
      }

      // Update NRC data with variations
      const newAccepted = variation(initialNrcData.accepted)
      const newRejected = variation(initialNrcData.rejected)
      const newPending = variation(initialNrcData.pending)
      const newTotal = newAccepted + newRejected + newPending

      const updatedNrcData = {
        ...initialNrcData,
        total: newTotal,
        accepted: newAccepted,
        rejected: newRejected,
        pending: newPending,
        growth: (((newTotal - initialNrcData.total) / initialNrcData.total) * 100).toFixed(1),
      }

      setNrcData(updatedNrcData)

      // Update pie data
      setPieData([
        { name: "Accepted", value: newAccepted, color: "#0FA644" },
        { name: "Rejected", value: newRejected, color: "#EF4444" },
        { name: "Pending", value: newPending, color: "#27418C" },
      ])

      // Update monthly trend data
      const newMonthlyTrendData = [...initialMonthlyTrendData]
      newMonthlyTrendData[newMonthlyTrendData.length - 1] = {
        ...newMonthlyTrendData[newMonthlyTrendData.length - 1],
        total: newTotal,
        accepted: newAccepted,
        rejected: newRejected,
        pending: newPending,
      }
      setMonthlyTrendData(newMonthlyTrendData)

      // Update activities with random variations in days
      const newActivities = initialActivities.map((activity) => ({
        ...activity,
        updatedDaysAgo: Math.max(1, variation(activity.updatedDaysAgo) % 10), // Keep between 1 and 9 days
      }))
      setActivities(newActivities)

      setIsRefreshing(false)
    }, 1000)
  }

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="flex items-center">
            <div className="bg-[#0FA644] w-2.5 h-2.5 rounded-full mr-2"></div>
            <span className="text-[#0FA644] font-medium">Accepted</span>
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
            <div className="bg-[#27418C] w-2.5 h-2.5 rounded-full mr-2"></div>
            <span className="text-[#27418C] font-medium">Pending</span>
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
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#27418C]/10 text-[#27418C]">Medium</span>
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
          <p className="text-sm text-gray-500">{`${((payload[0].value / nrcData.total) * 100).toFixed(
            1,
          )}% of total`}</p>
        </div>
      )
    }
    return null
  }

  // Custom legend for pie chart
  const renderPieChartLegend = () => {
    return (
      <div className="flex flex-wrap items-center gap-3 justify-end">
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
            <span className="text-xs text-gray-500">{entry.name}</span>
          </div>
        ))}
      </div>
    )
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
      if ((notificationsOpen || userMenuOpen || filterOpen) && !event.target.closest(".dropdown-container")) {
        setNotificationsOpen(false)
        setUserMenuOpen(false)
        setFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notificationsOpen, userMenuOpen, filterOpen])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="bg-white shadow mb-6 rounded-lg">
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
                    <TrendingUp className="flex-shrink-0 mr-1.5 h-5 w-5 text-[#0FA644]" />
                    <span className="text-[#0FA644] font-medium pr-1">{nrcData.growth}% growth</span>
                    from last period
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 md:mt-0 md:ml-4">
                {/* Filter button and dropdown */}
                <div className="relative dropdown-container">
                  <button
                    type="button"
                    onClick={handleFilter}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27418C]"
                  >
                    <Filter
                      className={`-ml-1 mr-2 h-5 w-5 ${isFiltering ? "animate-spin text-[#27418C]" : "text-gray-500"}`}
                    />
                    Filter
                  </button>

                  {/* Filter dropdown */}
                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Filter Options</h3>

                        {/* Status filter */}
                        <div className="mb-3">
                          <label htmlFor="status-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            id="status-filter"
                            value={filterOptions.status}
                            onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="all">All Statuses</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>

                        {/* Priority filter */}
                        <div className="mb-3">
                          <label htmlFor="priority-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            id="priority-filter"
                            value={filterOptions.priority}
                            onChange={(e) => setFilterOptions({ ...filterOptions, priority: e.target.value })}
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="all">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>

                        {/* Date filter */}
                        <div className="mb-4">
                          <label htmlFor="date-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Updated Within
                          </label>
                          <select
                            id="date-filter"
                            value={filterOptions.date}
                            onChange={(e) => setFilterOptions({ ...filterOptions, date: e.target.value })}
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="all">Any Time</option>
                            <option value="1">Last 24 Hours</option>
                            <option value="3">Last 3 Days</option>
                            <option value="7">Last Week</option>
                          </select>
                        </div>

                        {/* Filter actions */}
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={resetFilter}
                            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            Reset
                          </button>
                          <button
                            type="button"
                            onClick={applyFilter}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-[#27418C] rounded-md hover:bg-[#27418C]/90"
                          >
                            Apply Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Refresh button */}
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27418C] ${isRefreshing ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  <RefreshCw
                    className={`-ml-1 mr-2 h-5 w-5 ${isRefreshing ? "animate-spin text-[#27418C]" : "text-gray-500"}`}
                  />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>

                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#27418C] hover:bg-[#27418C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27418C]"
                >
                  <Download className="-ml-1 mr-2 h-5 w-5" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total NRC */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 h-full flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#27418C] rounded-md p-3">
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
                      className="absolute h-full bg-[#27418C]"
                      style={{ width: `${(nrcData.reviewed / nrcData.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Toatl Reviewed: </span>
                    <span className="text-[#27418C] font-medium">
                      {((nrcData.reviewed / nrcData.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 mt-auto">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#27418C] hover:text-[#27418C]/80 flex items-center">
                    View all NRC
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Accepted NRC */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 h-full flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#0FA644] rounded-md p-3">
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
                <div className="mt-6">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="absolute h-full bg-[#0FA644]"
                      style={{ width: `${(nrcData.accepted / nrcData.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Accepted:</span>
                    <span className="text-[#0FA644] font-medium">
                      {((nrcData.accepted / nrcData.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 mt-auto">
                <div className="text-sm">
                  <a href="#" className="font-medium text-emerald-600 hover:text-[#0FA644] flex items-center">
                    View accepted NRC
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rejected NRC */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 h-full flex flex-col">
              <div className="p-5 flex-grow">
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
                <div className="mt-6">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="absolute h-full bg-red-500"
                      style={{ width: `${(nrcData.rejected / nrcData.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Rejected:</span>
                    <span className="text-red-500 font-medium">
                      {((nrcData.rejected / nrcData.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 mt-auto">
                <div className="text-sm">
                  <a href="#" className="font-medium text-red-600 hover:text-red-500 flex items-center">
                    View rejected NRC
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Pending NRC */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 h-full flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#27418C] rounded-md p-3">
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
                <div className="mt-6">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="absolute h-full bg-[#27418C]"
                      style={{ width: `${(nrcData.pending / nrcData.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Pending:</span>
                    <span className="text-[#27418C] font-medium">
                      {((nrcData.pending / nrcData.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 mt-auto">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#27418C] hover:text-[#27418C]/80 flex items-center">
                    View pending NRC
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Charts section */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Status distribution chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2 sm:mb-0">NRC Status Distribution</h3>
                  {renderPieChartLegend()}
                </div>
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Monthly trend chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2 sm:mb-0">Monthly Trend</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#0FA644] mr-1"></div>
                      <span className="text-xs text-gray-500">Accepted</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                      <span className="text-xs text-gray-500">Rejected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#27418C] mr-1"></div>
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5">
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
                      <Bar dataKey="accepted" stackId="a" fill="#0FA644" />
                      <Bar dataKey="rejected" stackId="a" fill="#EF4444" />
                      <Bar dataKey="pending" stackId="a" fill="#27418C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mt-8 bg-white shadow overflow-hidden rounded-lg border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                {filterOptions.status !== "all" || filterOptions.priority !== "all" || filterOptions.date !== "all" ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Filtered</span>
                    <button onClick={resetFilter} className="text-xs text-[#27418C] hover:text-[#27418C]/80">
                      Clear
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="bg-white overflow-hidden">
              {isFiltering ? (
                <div className="flex justify-center items-center py-20">
                  <RefreshCw className="h-8 w-8 text-[#27418C] animate-spin" />
                  <span className="ml-2 text-gray-600">Filtering data...</span>
                </div>
              ) : currentActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="text-gray-400 mb-2">
                    <Filter className="h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your filters</p>
                  <button
                    onClick={resetFilter}
                    className="mt-4 px-4 py-2 bg-[#27418C] text-white rounded-md hover:bg-[#27418C]/90"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {currentActivities.map((activity) => (
                    <div key={activity.id} className="px-5 py-4 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start sm:items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                activity.status === "Accepted"
                                  ? "bg-[#0FA644]/10"
                                  : activity.status === "Rejected"
                                    ? "bg-red-100"
                                    : "bg-[#27418C]/10"
                              }`}
                            >
                              {activity.status === "Accepted" ? (
                                <CheckCircle className="h-6 w-6 text-[#0FA644]" />
                              ) : activity.status === "Rejected" ? (
                                <XCircle className="h-6 w-6 text-red-600" />
                              ) : (
                                <Clock className="h-6 w-6 text-[#27418C]" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium text-gray-900">{activity.id}</h4>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{activity.title}</p>
                            <p className="mt-1 text-xs text-gray-400">{activity.note}</p>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start space-y-0 sm:space-y-2 w-full sm:w-auto">
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
              )}
              {filteredActivities.length > activitiesPerPage && !isFiltering && (
                <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-gray-700 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5 mr-2" />
                      Previous
                    </button>
                    <div className="hidden md:flex items-center">
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-gray-700 bg-white hover:bg-gray-50"
                      }`}
                    >
                      Next
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
