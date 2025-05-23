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
  X,
  CalendarRange,
} from "lucide-react"

import {
  nrcDataByPeriod,
  monthlyTrendData,
  activitiesData,
  timeAgo,
  filterActivitiesByPeriod,
  calculateNrcDataFromActivities,
  generatePieData,
} from "../Dashboard/data/data"

function Dashboard() {

  // State for screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const activitiesPerPage = 5

  // State for filter and refresh
  const [isFiltering, setIsFiltering] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  // New filter options with time period
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    priority: "all",
    timePeriod: "thisMonth",
    customStartDate: "",
    customEndDate: "",
  })

  // State for showing custom date range inputs
  const [showCustomDateRange, setShowCustomDateRange] = useState(false)

  // State for NRC data
  const [nrcData, setNrcData] = useState(nrcDataByPeriod.thisMonth)

  // State for activities
  const [activities, setActivities] = useState(filterActivitiesByPeriod(activitiesData, "thisMonth"))

  // State for pie data
  const [pieData, setPieData] = useState(generatePieData(nrcDataByPeriod.thisMonth))

  // State for visible monthly trend data (current year only)
  const [visibleMonthlyTrendData, setVisibleMonthlyTrendData] = useState(monthlyTrendData)

  // State for active filters display
  const [activeFilters, setActiveFilters] = useState([])

  // Update active filters whenever filter options change
  useEffect(() => {
    const newActiveFilters = []

    if (filterOptions.timePeriod === "thisMonth") {
      newActiveFilters.push({ key: "timePeriod", value: "This Month", label: "Time Period" })
    } else if (filterOptions.timePeriod === "lastMonth") {
      newActiveFilters.push({ key: "timePeriod", value: "Last Month", label: "Time Period" })
    } else if (filterOptions.timePeriod === "custom") {
      newActiveFilters.push({
        key: "timePeriod",
        value: `${filterOptions.customStartDate} to ${filterOptions.customEndDate}`,
        label: "Date Range",
      })
    }

    if (filterOptions.status !== "all") {
      newActiveFilters.push({
        key: "status",
        value: filterOptions.status.charAt(0).toUpperCase() + filterOptions.status.slice(1),
        label: "Status",
      })
    }

    if (filterOptions.priority !== "all") {
      newActiveFilters.push({
        key: "priority",
        value: filterOptions.priority.charAt(0).toUpperCase() + filterOptions.priority.slice(1),
        label: "Priority",
      })
    }

    setActiveFilters(newActiveFilters)
  }, [filterOptions])

  // Filter activities based on filter options
  const filteredActivities = activities.filter((activity) => {
    const matchesStatus =
      filterOptions.status === "all" || activity.status.toLowerCase() === filterOptions.status.toLowerCase()

    const matchesPriority =
      filterOptions.priority === "all" || activity.priority.toLowerCase() === filterOptions.priority.toLowerCase()

    return matchesStatus && matchesPriority
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

  // Handle time period change
  const handleTimePeriodChange = (period) => {
    setFilterOptions({
      ...filterOptions,
      timePeriod: period,
    })

    if (period === "custom") {
      setShowCustomDateRange(true)
    } else {
      setShowCustomDateRange(false)
    }
  }

  // Apply filter
  const applyFilter = () => {
    setIsFiltering(true)

    // Simulate filtering process
    setTimeout(() => {
      // Apply time period filter
      let filteredData

      if (filterOptions.timePeriod === "thisMonth") {
        filteredData = filterActivitiesByPeriod(activitiesData, "thisMonth")
        setNrcData(nrcDataByPeriod.thisMonth)
        setPieData(generatePieData(nrcDataByPeriod.thisMonth))
      } else if (filterOptions.timePeriod === "lastMonth") {
        filteredData = filterActivitiesByPeriod(activitiesData, "lastMonth")
        setNrcData(nrcDataByPeriod.lastMonth)
        setPieData(generatePieData(nrcDataByPeriod.lastMonth))
      } else if (filterOptions.timePeriod === "custom") {
        // For custom date range, filter based on the date range
        // For demo purposes, use a subset of the data
        filteredData = activitiesData.slice(0, 15)

        // Calculate NRC data from filtered activities
        const calculatedNrcData = calculateNrcDataFromActivities(filteredData)
        setNrcData(calculatedNrcData)
        setPieData(generatePieData(calculatedNrcData))
      }

      setActivities(filteredData)
      setIsFiltering(false)
      setFilterOpen(false)
    }, 800)
  }

  // Reset filter
  const resetFilter = () => {
    setFilterOptions({
      status: "all",
      priority: "all",
      timePeriod: "thisMonth",
      customStartDate: "",
      customEndDate: "",
    })

    setShowCustomDateRange(false)

    // Reset data to this month
    setNrcData(nrcDataByPeriod.thisMonth)
    setPieData(generatePieData(nrcDataByPeriod.thisMonth))
    setActivities(filterActivitiesByPeriod(activitiesData, "thisMonth"))
  }

  // Remove a specific filter
  const removeFilter = (key) => {
    if (key === "timePeriod") {
      setFilterOptions({
        ...filterOptions,
        timePeriod: "thisMonth",
        customStartDate: "",
        customEndDate: "",
      })

      setShowCustomDateRange(false)
      setNrcData(nrcDataByPeriod.thisMonth)
      setPieData(generatePieData(nrcDataByPeriod.thisMonth))
      setActivities(filterActivitiesByPeriod(activitiesData, "thisMonth"))
    } else {
      setFilterOptions({
        ...filterOptions,
        [key]: "all",
      })
    }
  }

  // Refresh handler. When applied refetch the data from the database when the backend is connected
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
      const currentNrcData = { ...nrcData }
      const newAccepted = variation(currentNrcData.accepted)
      const newRejected = variation(currentNrcData.rejected)
      const newPending = variation(currentNrcData.pending)
      const newTotal = newAccepted + newRejected + newPending

      const updatedNrcData = {
        ...currentNrcData,
        total: newTotal,
        accepted: newAccepted,
        rejected: newRejected,
        pending: newPending,
        growth: (((newTotal - currentNrcData.total) / currentNrcData.total) * 100).toFixed(1),
        reviewed: newAccepted + newRejected,
      }

      setNrcData(updatedNrcData)

      // Update pie data
      setPieData([
        { name: "Accepted", value: newAccepted, color: "#0FA644" },
        { name: "Rejected", value: newRejected, color: "#EF4444" },
        { name: "Pending", value: newPending, color: "#2D3FA6" },
      ])

      // Update monthly trend data for the current month
      const newMonthlyTrendData = [...monthlyTrendData]
      const currentMonthIndex = new Date().getMonth()

      if (newMonthlyTrendData[currentMonthIndex]) {
        newMonthlyTrendData[currentMonthIndex] = {
          ...newMonthlyTrendData[currentMonthIndex],
          total: newTotal,
          accepted: newAccepted,
          rejected: newRejected,
          pending: newPending,
        }
      }

      setVisibleMonthlyTrendData(newMonthlyTrendData)

      setIsRefreshing(false)
    }, 1000)
  }

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="flex items-center bg-[#0FA644]/10 p-1 px-2 rounded-full">
            <div className="bg-[#0FA644] w-2 h-2 rounded-full mr-2"></div>
            <span className="text-[#0FA644] font-medium text-xs">Accepted</span>
          </div>
        )
      case "Rejected":
        return (
          <div className="flex items-center bg-red-100 p-1 px-2 rounded-full">
            <div className="bg-red-500 w-2 h-2 rounded-full mr-2"></div>
            <span className="text-red-500 font-medium text-xs">Rejected</span>
          </div>
        )
      case "Pending":
        return (
          <div className="flex items-center bg-[#27418C]/10 p-1 px-2 rounded-full">
            <div className="bg-[#27418C] w-2 h-2 rounded-full mr-2"></div>
            <span className="text-[#2D3FA6] font-medium text-xs">Pending</span>
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

  // Checking screen size on mount and resize
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
      if (filterOpen && !event.target.closest(".dropdown-container")) {
        setFilterOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [filterOpen])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main content area */}
      <main className=" mx-auto px-4 py-6 sm:px-6 lg:px-8">
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

                {/* Active filters display */}
                {activeFilters.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#27418C]/10 text-[#27418C]"
                      >
                        <span className="mr-1 text-gray-500">{filter.label}:</span>
                        {filter.value}
                        <button
                          onClick={() => removeFilter(filter.key)}
                          className="ml-1 text-gray-400 hover:text-[#27418C]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {activeFilters.length > 0 && (
                      <button
                        onClick={resetFilter}
                        className="text-xs text-[#27418C] hover:text-[#27418C]/80 underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}
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
                    <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Filter Options</h3>

                        {/* Time period filter */}
                        <div className="mb-3">
                          <label htmlFor="time-period-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Time Period
                          </label>
                          <select
                            id="time-period-filter"
                            value={filterOptions.timePeriod}
                            onChange={(e) => handleTimePeriodChange(e.target.value)}
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="custom">Custom Range</option>
                          </select>
                        </div>

                        {/* Custom date range */}
                        {showCustomDateRange && (
                          <div className="mb-3 p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center mb-2">
                              <CalendarRange className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-xs font-medium text-gray-700">Custom Date Range</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label htmlFor="start-date" className="block text-xs text-gray-500 mb-1">
                                  Start Date
                                </label>
                                <input
                                  type="date"
                                  id="start-date"
                                  value={filterOptions.customStartDate}
                                  onChange={(e) =>
                                    setFilterOptions({
                                      ...filterOptions,
                                      customStartDate: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-md border border-gray-300 py-1 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                                />
                              </div>
                              <div>
                                <label htmlFor="end-date" className="block text-xs text-gray-500 mb-1">
                                  End Date
                                </label>
                                <input
                                  type="date"
                                  id="end-date"
                                  value={filterOptions.customEndDate}
                                  onChange={(e) =>
                                    setFilterOptions({
                                      ...filterOptions,
                                      customEndDate: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-md border border-gray-300 py-1 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Status filter */}
                        <div className="mb-3">
                          <label htmlFor="status-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            id="status-filter"
                            value={filterOptions.status}
                            onChange={(e) =>
                              setFilterOptions({
                                ...filterOptions,
                                status: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="all">All Statuses</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>

                        {/* Priority filter */}
                        <div className="mb-4">
                          <label htmlFor="priority-filter" className="block text-xs font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            id="priority-filter"
                            value={filterOptions.priority}
                            onChange={(e) =>
                              setFilterOptions({
                                ...filterOptions,
                                priority: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#27418C]"
                          >
                            <option value="all">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
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
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27418C] ${
                    isRefreshing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <RefreshCw
                    className={`-ml-1 mr-2 h-5 w-5 ${isRefreshing ? "animate-spin text-[#27418C]" : "text-gray-500"}`}
                  />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>

                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2D3FA6] hover:bg-[#27418C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27418C]"
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
                      style={{
                        width: `${(nrcData.reviewed / nrcData.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Reviewed: </span>
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
                      style={{
                        width: `${(nrcData.accepted / nrcData.total) * 100}%`,
                      }}
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
                      style={{
                        width: `${(nrcData.rejected / nrcData.total) * 100}%`,
                      }}
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
                  <div className="flex-shrink-0 bg-[#2D3FA6] rounded-md p-3">
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
                      className="absolute h-full bg-[#2D3FA6]"
                      style={{
                        width: `${(nrcData.pending / nrcData.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Pending:</span>
                    <span className="text-[#2D3FA6] font-medium">
                      {((nrcData.pending / nrcData.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 mt-auto">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#2D3FA6] hover:text-[#2D3FA6]/80 flex items-center">
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
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2 sm:mb-0">
                    NRC Status Distribution
                    {filterOptions.timePeriod === "thisMonth" && (
                      <span className="text-gray-400 text-sm ml-2">(This Month)</span>
                    )}
                    {filterOptions.timePeriod === "lastMonth" && (
                      <span className="text-gray-400 text-sm ml-2">(Last Month)</span>
                    )}
                    {filterOptions.timePeriod === "custom" && (
                      <span className="text-gray-400 text-sm ml-2">(Custom Range)</span>
                    )}
                  </h3>
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
                        labelLine={true}
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
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2 sm:mb-0">
                    Monthly Trend <span className="text-gray-400 text-sm">(This year)</span>{" "}
                  </h3>
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
                      <div className="h-3 w-3 rounded-full bg-[#2D3FA6] mr-1"></div>
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={visibleMonthlyTrendData}
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
                      <Bar dataKey="pending" stackId="a" fill="#2D3FA6" />
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Recent Activity
                  {filterOptions.timePeriod === "thisMonth" && (
                    <span className="text-gray-400 text-sm ml-2">(This Month)</span>
                  )}
                  {filterOptions.timePeriod === "lastMonth" && (
                    <span className="text-gray-400 text-sm ml-2">(Last Month)</span>
                  )}
                  {filterOptions.timePeriod === "custom" && (
                    <span className="text-gray-400 text-sm ml-2">(Custom Range)</span>
                  )}
                </h3>
                {(filterOptions.status !== "all" || filterOptions.priority !== "all") && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Filtered</span>
                    <button
                      onClick={() => {
                        setFilterOptions({
                          ...filterOptions,
                          status: "all",
                          priority: "all",
                        })
                      }}
                      className="text-xs text-[#27418C] hover:text-[#27418C]/80"
                    >
                      Clear
                    </button>
                  </div>
                )}
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
                          <span className="text-xs text-gray-500">{timeAgo(activity.updatedAt)}</span>
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
