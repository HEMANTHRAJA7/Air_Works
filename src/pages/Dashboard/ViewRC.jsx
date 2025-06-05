"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Calendar,
  Plane,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import { mockRcData } from "../Dashboard/data/rc-data"

const ViewRC = () => {
  const navigate = useNavigate()

  // State management
  const [rcs, setRcs] = useState([])
  const [filteredRcs, setFilteredRcs] = useState([])
  const [filters, setFilters] = useState({
    aircraftNumber: "",
    dateRange: { type: "all", startDate: null, endDate: null },
  })
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter panel state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [isAircraftOpen, setIsAircraftOpen] = useState(true)
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(true)
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  // Load mock data on component mount
  useEffect(() => {
    setRcs([...mockRcData])
    setFilteredRcs([...mockRcData])
  }, [])

  // Get unique aircraft numbers for dropdown
  const uniqueAircraftNumbers = [...new Set(mockRcData.map((rc) => rc.aircraftNumber))].sort()

  // Apply filters and search
  useEffect(() => {
    let result = [...rcs]

    // Apply aircraft number filter
    if (filters.aircraftNumber) {
      result = result.filter((rc) => rc.aircraftNumber === filters.aircraftNumber)
    }

    // Apply date range filter
    if (filters.dateRange.type !== "all") {
      const today = new Date()
      let startDate, endDate

      if (filters.dateRange.type === "thisMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      } else if (filters.dateRange.type === "lastMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        endDate = new Date(today.getFullYear(), today.getMonth(), 0)
      } else if (filters.dateRange.type === "custom" && filters.dateRange.startDate && filters.dateRange.endDate) {
        startDate = new Date(filters.dateRange.startDate)
        endDate = new Date(filters.dateRange.endDate)
      }

      if (startDate && endDate) {
        result = result.filter((rc) => {
          const rcDate = new Date(rc.date)
          return rcDate >= startDate && rcDate <= endDate
        })
      }
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (rc) =>
          rc.aircraftNumber.toLowerCase().includes(query) ||
          rc.rcNumber.toLowerCase().includes(query) ||
          rc.description.toLowerCase().includes(query) ||
          rc.tradeToAction.toLowerCase().includes(query),
      )
    }

    setFilteredRcs(result)
    setCurrentPage(1)
  }, [rcs, filters, searchQuery])

  // Event handlers
  const handleSearch = (e) => {
    e.preventDefault()
  }

  const handleFilterChange = (filterType, value) => {
    if (filterType === "aircraftNumber") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        aircraftNumber: value,
      }))
    } else if (filterType === "dateRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: {
          type: value,
          startDate: value === "custom" ? customStartDate : null,
          endDate: value === "custom" ? customEndDate : null,
        },
      }))
    }
  }

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: {
          type: "custom",
          startDate: customStartDate,
          endDate: customEndDate,
        },
      }))
    }
  }

  const handleRemoveFilter = (filterType) => {
    if (filterType === "aircraftNumber") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        aircraftNumber: "",
      }))
    } else if (filterType === "dateRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: { type: "all", startDate: null, endDate: null },
      }))
    }
  }

  const handleViewRc = (rc) => {
    navigate(`/dashboard/routine-card/${rc.id}`)
  }

  // Check if any filters are applied
  const hasFilters = filters.aircraftNumber || filters.dateRange.type !== "all"

  // Get date range label for display
  const getDateRangeLabel = () => {
    switch (filters.dateRange.type) {
      case "thisMonth":
        return "This Month"
      case "lastMonth":
        return "Last Month"
      case "custom":
        if (filters.dateRange.startDate && filters.dateRange.endDate) {
          return `${filters.dateRange.startDate} to ${filters.dateRange.endDate}`
        }
        return "Custom Date Range"
      default:
        return null
    }
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Get current RCs for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRcs = filteredRcs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredRcs.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 pt-14 md:pt-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow mb-6">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Routine Cards</h1>
              <div className="mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">
                  {filteredRcs.length} of {rcs.length} Routine Cards
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Toggle */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full p-4 pl-10 pr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by aircraft number, RC number, description, trade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-white"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="xl:hidden bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-white flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </form>

          {/* Mobile Filter Panel */}
          {isFilterPanelOpen && (
            <div className="xl:hidden bg-white rounded-lg shadow-md p-4 border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-gray-500" />
                  Filters
                </h3>
                <button onClick={() => setIsFilterPanelOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Content */}
              <div className="space-y-4">
                {/* Aircraft Number Filter */}
                <div className="border-b pb-4">
                  <button
                    className="flex items-center justify-between w-full text-left font-medium"
                    onClick={() => setIsAircraftOpen(!isAircraftOpen)}
                  >
                    <span>Aircraft Number</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${isAircraftOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>

                  {isAircraftOpen && (
                    <div className="mt-2">
                      <select
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        value={filters.aircraftNumber}
                        onChange={(e) => handleFilterChange("aircraftNumber", e.target.value)}
                      >
                        <option value="">All Aircraft</option>
                        {uniqueAircraftNumbers.map((aircraft) => (
                          <option key={aircraft} value={aircraft}>
                            {aircraft}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Date Range Filter */}
                <div>
                  <button
                    className="flex items-center justify-between w-full text-left font-medium"
                    onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                  >
                    <span>Date Range</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${isDateRangeOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>

                  {isDateRangeOpen && (
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.dateRange.type === "all"}
                          onChange={() => handleFilterChange("dateRange", "all")}
                        />
                        <span className="ml-2 text-sm">All Time</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.dateRange.type === "thisMonth"}
                          onChange={() => handleFilterChange("dateRange", "thisMonth")}
                        />
                        <span className="ml-2 text-sm">This Month</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.dateRange.type === "lastMonth"}
                          onChange={() => handleFilterChange("dateRange", "lastMonth")}
                        />
                        <span className="ml-2 text-sm">Last Month</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.dateRange.type === "custom"}
                          onChange={() => handleFilterChange("dateRange", "custom")}
                        />
                        <span className="ml-2 text-sm">Custom Range</span>
                      </label>

                      {filters.dateRange.type === "custom" && (
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                              type="date"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              value={customStartDate}
                              onChange={(e) => setCustomStartDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                              type="date"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              value={customEndDate}
                              onChange={(e) => setCustomEndDate(e.target.value)}
                            />
                          </div>
                          <button
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                            onClick={handleCustomDateChange}
                          >
                            Apply Custom Range
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Desktop Filter Panel */}
          <div className="hidden xl:block xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                <h2 className="text-lg font-medium">Filters</h2>
              </div>

              {/* Aircraft Number Filter */}
              <div className="mb-6 border-b pb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsAircraftOpen(!isAircraftOpen)}
                >
                  <span>Aircraft Number</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isAircraftOpen ? "transform rotate-180" : ""}`}
                  />
                </button>

                {isAircraftOpen && (
                  <div className="mt-3">
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      value={filters.aircraftNumber}
                      onChange={(e) => handleFilterChange("aircraftNumber", e.target.value)}
                    >
                      <option value="">All Aircraft</option>
                      {uniqueAircraftNumbers.map((aircraft) => (
                        <option key={aircraft} value={aircraft}>
                          {aircraft}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Date Range Filter */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                >
                  <span>Date Range</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isDateRangeOpen ? "transform rotate-180" : ""}`}
                  />
                </button>

                {isDateRangeOpen && (
                  <div className="mt-3 space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "all"}
                        onChange={() => handleFilterChange("dateRange", "all")}
                      />
                      <span className="ml-3 text-sm">All Time</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "thisMonth"}
                        onChange={() => handleFilterChange("dateRange", "thisMonth")}
                      />
                      <span className="ml-3 text-sm">This Month</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "lastMonth"}
                        onChange={() => handleFilterChange("dateRange", "lastMonth")}
                      />
                      <span className="ml-3 text-sm">Last Month</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "custom"}
                        onChange={() => handleFilterChange("dateRange", "custom")}
                      />
                      <span className="ml-3 text-sm">Custom Range</span>
                    </label>

                    {filters.dateRange.type === "custom" && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">End Date</label>
                          <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                          />
                        </div>
                        <button
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                          onClick={handleCustomDateChange}
                        >
                          Apply Custom Range
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Applied Filters */}
            {hasFilters && (
              <div className="mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Applied Filters:</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {filters.aircraftNumber && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Aircraft: {filters.aircraftNumber}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                          onClick={() => handleRemoveFilter("aircraftNumber")}
                        >
                          <span className="sr-only">Remove filter for {filters.aircraftNumber}</span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    {filters.dateRange.type !== "all" && getDateRangeLabel() && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Calendar className="h-3 w-3 mr-1" />
                        Date: {getDateRangeLabel()}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                          onClick={() => handleRemoveFilter("dateRange")}
                        >
                          <span className="sr-only">Remove date filter</span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* RC Cards */}
            <div className="space-y-3">
              {filteredRcs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Routine Cards found</h3>
                  <p className="text-gray-500">No Routine Cards match your current search criteria.</p>
                </div>
              ) : (
                <>
                  {currentRcs.map((rc) => (
                    <div key={rc.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-4">
                        {/* Header Row */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">RC #{rc.rcNumber}</h3>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Plane className="w-4 h-4 mr-1" />
                              <span className="font-medium">{rc.aircraftNumber}</span>
                              <span className="mx-2">•</span>
                              <span>{rc.aircraftModel}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 lg:mt-0">
                            <button
                              onClick={() => handleViewRc(rc)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{rc.description}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Reported by:</span>
                              <div className="font-medium text-gray-900 truncate">{rc.reportedBy}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <div className="font-medium text-gray-900">{new Date(rc.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Trade:</span>
                              <div className="font-medium text-gray-900">{rc.tradeToAction}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">ATA:</span>
                              <div className="font-medium text-gray-900">{rc.ata}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-700">
                          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRcs.length)} of{" "}
                          {filteredRcs.length} results
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                              currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                          </button>
                          <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                              currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewRC
