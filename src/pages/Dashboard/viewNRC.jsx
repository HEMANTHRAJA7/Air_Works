import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Check,
  X,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Clock,
  Plane,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { mockNrcData } from "../../pages/Dashboard/data/nrc-data"

const ViewNRC = () => {
  const navigate = useNavigate()

  // State management
  const [nrcs, setNrcs] = useState([])
  const [filteredNrcs, setFilteredNrcs] = useState([])
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    dateRange: { type: "all", startDate: null, endDate: null },
  })
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter panel state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(true)
  const [isPriorityOpen, setIsPriorityOpen] = useState(true)
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(true)
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  // Modal states
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedNrcId, setSelectedNrcId] = useState(null)
  const [rejectReason, setRejectReason] = useState("")
  const [feedbackType, setFeedbackType] = useState("data-insufficient")
  const [feedbackDetails, setFeedbackDetails] = useState("")

  // Load mock data on component mount
  useEffect(() => {
    setNrcs(mockNrcData)
    setFilteredNrcs(mockNrcData)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...nrcs]

    // Apply status filters
    if (filters.status.length > 0) {
      result = result.filter((nrc) => filters.status.includes(nrc.status))
    }

    // Apply priority filters
    if (filters.priority.length > 0) {
      result = result.filter((nrc) => filters.priority.includes(nrc.priority))
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
        result = result.filter((nrc) => {
          const nrcDate = new Date(nrc.date)
          return nrcDate >= startDate && nrcDate <= endDate
        })
      }
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (nrc) =>
          nrc.aircraftNumber.toLowerCase().includes(query) ||
          nrc.nrcNumber.toLowerCase().includes(query) ||
          nrc.status.toLowerCase().includes(query) ||
          nrc.priority.toLowerCase().includes(query) ||
          nrc.description.toLowerCase().includes(query),
      )
    }

    setFilteredNrcs(result)
    setCurrentPage(1)
  }, [nrcs, filters, searchQuery])

  // Event handlers
  const handleSearch = (e) => {
    e.preventDefault()
  }

  const handleFilterChange = (filterType, value) => {
    if (filterType === "status" || filterType === "priority") {
      setFilters((prevFilters) => {
        const currentValues = prevFilters[filterType]
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value]

        return {
          ...prevFilters,
          [filterType]: updatedValues,
        }
      })
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

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === "status" || filterType === "priority") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((item) => item !== value),
      }))
    } else if (filterType === "dateRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: { type: "all", startDate: null, endDate: null },
      }))
    }
  }

  const handleViewNrc = (nrc) => {
    navigate(`/dashboard/view-nrc/${nrc.id}`)
  }

  const handleNrcAction = (nrcId, action, feedbackText = "") => {
    setNrcs((prevNrcs) =>
      prevNrcs.map((nrc) =>
        nrc.id === nrcId
          ? {
              ...nrc,
              status: action === "accept" ? "accepted" : action === "reject" ? "rejected" : nrc.status,
              customerFeedback: feedbackText || nrc.customerFeedback,
            }
          : nrc,
      ),
    )
  }

  // Modal handlers
  const handleAcceptClick = (nrcId) => {
    setSelectedNrcId(nrcId)
    setShowAcceptModal(true)
  }

  const handleRejectClick = (nrcId) => {
    setSelectedNrcId(nrcId)
    setShowRejectModal(true)
  }

  const handleFeedbackClick = (nrcId) => {
    setSelectedNrcId(nrcId)
    setShowFeedbackModal(true)
  }

  const handleAcceptConfirm = () => {
    if (selectedNrcId) {
      handleNrcAction(selectedNrcId, "accept")
      setShowAcceptModal(false)
      setSelectedNrcId(null)
    }
  }

  const handleRejectConfirm = () => {
    if (selectedNrcId && rejectReason.trim()) {
      handleNrcAction(selectedNrcId, "reject", rejectReason)
      setShowRejectModal(false)
      setSelectedNrcId(null)
      setRejectReason("")
    }
  }

  const handleFeedbackSubmit = () => {
    if (selectedNrcId && feedbackDetails.trim()) {
      const feedbackMessage = `${feedbackType}: ${feedbackDetails}`
      handleNrcAction(selectedNrcId, "feedback", feedbackMessage)
      setShowFeedbackModal(false)
      setSelectedNrcId(null)
      setFeedbackDetails("")
      setFeedbackType("data-insufficient")
    }
  }

  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 mr-1 text-red-800" />
      case "high":
        return <AlertTriangle className="w-4 h-4 mr-1 text-orange-800" />
      case "medium":
        return <Clock className="w-4 h-4 mr-1 text-yellow-800" />
      case "low":
        return <Clock className="w-4 h-4 mr-1 text-green-800" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Check if any filters are applied
  const hasFilters = filters.status.length > 0 || filters.priority.length > 0 || filters.dateRange.type !== "all"

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

  // Get current NRCs for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentNrcs = filteredNrcs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredNrcs.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 pt-14 md:pt-0">
      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to accept?</h3>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAcceptModal(false)
                    setSelectedNrcId(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptConfirm}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to reject?</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for rejection:</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 text-sm"
                  placeholder="Enter reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setSelectedNrcId(null)
                    setRejectReason("")
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submit Feedback</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type:</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                >
                  <option value="data-insufficient">Data insufficient</option>
                  <option value="need-review">Need review</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed feedback:</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 text-sm"
                  placeholder="Enter detailed feedback..."
                  value={feedbackDetails}
                  onChange={(e) => setFeedbackDetails(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false)
                    setSelectedNrcId(null)
                    setFeedbackDetails("")
                    setFeedbackType("data-insufficient")
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackDetails.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow mb-6">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Search NRCs</h1>
              <div className="mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">
                  {filteredNrcs.length} of {nrcs.length} NRCs
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
                  placeholder="Search by aircraft number, NRC number, status, priority..."
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
                {/* Status Filter */}
                <div className="border-b pb-4">
                  <button
                    className="flex items-center justify-between w-full text-left font-medium"
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                  >
                    <span>Status</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${isStatusOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>

                  {isStatusOpen && (
                    <div className="mt-2 space-y-2">
                      {["pending", "accepted", "rejected"].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={filters.status.includes(status)}
                            onChange={() => handleFilterChange("status", status)}
                          />
                          <span className="ml-2 text-sm capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Priority Filter */}
                <div className="border-b pb-4">
                  <button
                    className="flex items-center justify-between w-full text-left font-medium"
                    onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                  >
                    <span>Priority</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${isPriorityOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>

                  {isPriorityOpen && (
                    <div className="mt-2 space-y-2">
                      {["critical", "high", "medium", "low"].map((priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={filters.priority.includes(priority)}
                            onChange={() => handleFilterChange("priority", priority)}
                          />
                          <span className="ml-2 text-sm capitalize">{priority}</span>
                        </label>
                      ))}
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

              {/* Status Filter */}
              <div className="mb-6 border-b pb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                >
                  <span>Status</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isStatusOpen ? "transform rotate-180" : ""}`}
                  />
                </button>

                {isStatusOpen && (
                  <div className="mt-3 space-y-3">
                    {["pending", "accepted", "rejected"].map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.status.includes(status)}
                          onChange={() => handleFilterChange("status", status)}
                        />
                        <span className="ml-3 text-sm capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Priority Filter */}
              <div className="mb-6 border-b pb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                >
                  <span>Priority</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isPriorityOpen ? "transform rotate-180" : ""}`}
                  />
                </button>

                {isPriorityOpen && (
                  <div className="mt-3 space-y-3">
                    {["critical", "high", "medium", "low"].map((priority) => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={filters.priority.includes(priority)}
                          onChange={() => handleFilterChange("priority", priority)}
                        />
                        <span className="ml-3 text-sm capitalize">{priority}</span>
                      </label>
                    ))}
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
                    {filters.status.map((status) => (
                      <div
                        key={`status-${status}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        Status: {status}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                          onClick={() => handleRemoveFilter("status", status)}
                        >
                          <span className="sr-only">Remove filter for {status}</span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {filters.priority.map((priority) => (
                      <div
                        key={`priority-${priority}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        Priority: {priority}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none focus:bg-purple-500 focus:text-white"
                          onClick={() => handleRemoveFilter("priority", priority)}
                        >
                          <span className="sr-only">Remove filter for {priority}</span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

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

            {/* NRC Cards */}
            <div className="space-y-3">
              {filteredNrcs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No NRCs found</h3>
                  <p className="text-gray-500">No NRCs match your current search criteria.</p>
                </div>
              ) : (
                <>
                  {currentNrcs.map((nrc) => (
                    <div key={nrc.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-4">
                        {/* Header Row */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">NRC #{nrc.nrcNumber}</h3>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                    nrc.status,
                                  )}`}
                                >
                                  {nrc.status.toUpperCase()}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full border flex items-center ${getPriorityColor(
                                    nrc.priority,
                                  )}`}
                                >
                                  {getPriorityIcon(nrc.priority)}
                                  {nrc.priority.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Plane className="w-4 h-4 mr-1" />
                              <span className="font-medium">{nrc.aircraftNumber}</span>
                              <span className="mx-2">•</span>
                              <span>{nrc.aircraftModel}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 lg:mt-0">
                            <button
                              onClick={() => handleViewNrc(nrc)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                            {nrc.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleAcceptClick(nrc.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRejectClick(nrc.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleFeedbackClick(nrc.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Feedback
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{nrc.description}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Reported by:</span>
                              <div className="font-medium text-gray-900 truncate">{nrc.reportedBy}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <div className="font-medium text-gray-900">{new Date(nrc.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Est. Hours:</span>
                              <div className="font-medium text-gray-900">{nrc.estimatedManHours}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <span className="text-gray-500">ATA:</span>
                              <div className="font-medium text-gray-900">{nrc.ata}</div>
                            </div>
                          </div>
                        </div>

                        {/* Feedback */}
                        {(nrc.customerFeedback || nrc.engineerReply) && (
                          <div className="mt-3 space-y-2">
                            {nrc.customerFeedback && (
                              <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                                <div className="flex items-start">
                                  <MessageSquare className="w-4 h-4 mr-2 text-blue-600 mt-0.5" />
                                  <div>
                                    <span className="text-sm font-medium text-blue-900">Customer Feedback:</span>
                                    <p className="text-sm text-blue-800 mt-1">{nrc.customerFeedback}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {nrc.engineerReply && (
                              <div className="p-3 bg-green-50 rounded-md border border-green-200">
                                <div className="flex items-start">
                                  <MessageSquare className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                                  <div>
                                    <span className="text-sm font-medium text-green-900">Engineer Reply:</span>
                                    <p className="text-sm text-green-800 mt-1">{nrc.engineerReply}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-700">
                          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredNrcs.length)} of{" "}
                          {filteredNrcs.length} results
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

export default ViewNRC
