"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

import { mockNrcData } from "./data/nrc-data";

const ViewNRC = () => {
  // State management
  const [nrcs, setNrcs] = useState([]);
  const [filteredNrcs, setFilteredNrcs] = useState([]);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    dateRange: { type: "all", startDate: null, endDate: null },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Filter panel state
  const [isStatusOpen, setIsStatusOpen] = useState(true);
  const [isPriorityOpen, setIsPriorityOpen] = useState(true);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(true);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // Load mock data on component mount
  useEffect(() => {
    setNrcs(mockNrcData);
    setFilteredNrcs(mockNrcData);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...nrcs];

    // Apply status filters
    if (filters.status.length > 0) {
      result = result.filter((nrc) => filters.status.includes(nrc.status));
    }

    // Apply priority filters
    if (filters.priority.length > 0) {
      result = result.filter((nrc) => filters.priority.includes(nrc.priority));
    }

    // Apply date range filter
    if (filters.dateRange.type !== "all") {
      const today = new Date();
      let startDate, endDate;

      if (filters.dateRange.type === "thisMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      } else if (filters.dateRange.type === "lastMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      } else if (
        filters.dateRange.type === "custom" &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        startDate = new Date(filters.dateRange.startDate);
        endDate = new Date(filters.dateRange.endDate);
      }

      if (startDate && endDate) {
        result = result.filter((nrc) => {
          const nrcDate = new Date(nrc.date);
          return nrcDate >= startDate && nrcDate <= endDate;
        });
      }
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (nrc) =>
          nrc.aircraftNumber.toLowerCase().includes(query) ||
          nrc.nrcNumber.toLowerCase().includes(query) ||
          nrc.status.toLowerCase().includes(query) ||
          nrc.priority.toLowerCase().includes(query) ||
          nrc.description.toLowerCase().includes(query)
      );
    }

    setFilteredNrcs(result);
  }, [nrcs, filters, searchQuery]);

  // Event handlers
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via the useEffect
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "status" || filterType === "priority") {
      setFilters((prevFilters) => {
        const currentValues = prevFilters[filterType];
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];

        return {
          ...prevFilters,
          [filterType]: updatedValues,
        };
      });
    } else if (filterType === "dateRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: {
          type: value,
          startDate: value === "custom" ? customStartDate : null,
          endDate: value === "custom" ? customEndDate : null,
        },
      }));
    }
  };

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: {
          type: "custom",
          startDate: customStartDate,
          endDate: customEndDate,
        },
      }));
    }
  };

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === "status" || filterType === "priority") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((item) => item !== value),
      }));
    } else if (filterType === "dateRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: { type: "all", startDate: null, endDate: null },
      }));
    }
  };

  const handleViewNrc = (nrc) => {
    setSelectedNrc(nrc);
    setIsModalOpen(true);
    setShowFeedbackForm(nrc.showFeedbackForm || false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowFeedbackForm(false);
  };

  const handleNrcAction = (nrcId, action, feedbackText = "") => {
    setNrcs((prevNrcs) =>
      prevNrcs.map((nrc) =>
        nrc.id === nrcId
          ? {
              ...nrc,
              status:
                action === "accept"
                  ? "accepted"
                  : action === "reject"
                  ? "rejected"
                  : nrc.status,
              feedback: feedbackText || nrc.feedback,
            }
          : nrc
      )
    );

    if (selectedNrc && selectedNrc.id === nrcId) {
      setSelectedNrc((prev) => ({
        ...prev,
        status:
          action === "accept"
            ? "accepted"
            : action === "reject"
            ? "rejected"
            : prev.status,
        feedback: feedbackText || prev.feedback,
      }));
    }

    if (action === "accept" || action === "reject") {
      setIsModalOpen(false);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim() && selectedNrc) {
      handleNrcAction(selectedNrc.id, "feedback", feedback);
      setFeedback("");
      setShowFeedbackForm(false);
    }
  };

  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 mr-1 text-red-800" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 mr-1 text-orange-800" />;
      case "medium":
        return <Clock className="w-4 h-4 mr-1 text-yellow-800" />;
      case "low":
        return <Clock className="w-4 h-4 mr-1 text-green-800" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Check if any filters are applied
  const hasFilters =
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.dateRange.type !== "all";

  // Get date range label for display
  const getDateRangeLabel = () => {
    switch (filters.dateRange.type) {
      case "thisMonth":
        return "This Month";
      case "lastMonth":
        return "Last Month";
      case "custom":
        if (filters.dateRange.startDate && filters.dateRange.endDate) {
          return `${filters.dateRange.startDate} to ${filters.dateRange.endDate}`;
        }
        return "Custom Date Range";
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className=" mx-auto sm:px-6 py-6">
        {/* header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 mb-7 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Search NRCs</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="w-full">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by aircraft number, NRC number, status, priority..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                <h2 className="text-lg font-medium">Filters</h2>
              </div>

              {/* Status Filter */}
              <div className="mb-4 border-b pb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                >
                  <span>Status</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isStatusOpen ? "transform rotate-180" : ""
                    }`}
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
                        <span className="ml-2 text-sm capitalize">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Priority Filter */}
              <div className="mb-4 border-b pb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                >
                  <span>Priority</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isPriorityOpen ? "transform rotate-180" : ""
                    }`}
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
                          onChange={() =>
                            handleFilterChange("priority", priority)
                          }
                        />
                        <span className="ml-2 text-sm capitalize">
                          {priority}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Range Filter */}
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                >
                  <span>Date Range</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isDateRangeOpen ? "transform rotate-180" : ""
                    }`}
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
                        onChange={() =>
                          handleFilterChange("dateRange", "thisMonth")
                        }
                      />
                      <span className="ml-2 text-sm">This Month</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "lastMonth"}
                        onChange={() =>
                          handleFilterChange("dateRange", "lastMonth")
                        }
                      />
                      <span className="ml-2 text-sm">Last Month</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.dateRange.type === "custom"}
                        onChange={() =>
                          handleFilterChange("dateRange", "custom")
                        }
                      />
                      <span className="ml-2 text-sm">Custom Range</span>
                    </label>

                    {filters.dateRange.type === "custom" && (
                      <div className="mt-2 space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
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

          <div className="lg:col-span-6">
            {/* Applied Filters */}
            {hasFilters && (
              <div className="mb-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Applied Filters:
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {filters.status.map((status) => (
                      <div
                        key={`status-${status}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        Status: {status}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                          onClick={() => handleRemoveFilter("status", status)}
                        >
                          <span className="sr-only">
                            Remove filter for {status}
                          </span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {filters.priority.map((priority) => (
                      <div
                        key={`priority-${priority}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        Priority: {priority}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none focus:bg-purple-500 focus:text-white"
                          onClick={() =>
                            handleRemoveFilter("priority", priority)
                          }
                        >
                          <span className="sr-only">
                            Remove filter for {priority}
                          </span>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {filters.dateRange.type !== "all" &&
                      getDateRangeLabel() && (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          Date: {getDateRangeLabel()}
                          <button
                            type="button"
                            className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
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

            {/* NRC List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {filteredNrcs.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No NRCs found matching your criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          NRC Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Aircraft
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Priority
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredNrcs.map((nrc) => (
                        <tr key={nrc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {nrc.nrcNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Plane className="w-4 h-4 mr-1 text-gray-400" />
                              {nrc.aircraftNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {nrc.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                nrc.status
                              )}`}
                            >
                              {nrc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                                nrc.priority
                              )}`}
                            >
                              {getPriorityIcon(nrc.priority)}
                              {nrc.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(nrc.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewNrc(nrc)}
                                className="text-blue-600 hover:text-blue-900"
                                title="View Details"
                              >
                                <Eye className="w-5 h-5" />
                              </button>

                              {nrc.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleNrcAction(nrc.id, "accept")
                                    }
                                    className="text-green-600 hover:text-green-900"
                                    title="Accept NRC"
                                  >
                                    <Check className="w-5 h-5" />
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleNrcAction(nrc.id, "reject")
                                    }
                                    className="text-red-600 hover:text-red-900"
                                    title="Reject NRC"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </>
                              )}

                              <button
                                onClick={() =>
                                  handleViewNrc({
                                    ...nrc,
                                    showFeedbackForm: true,
                                  })
                                }
                                className="text-purple-600 hover:text-purple-900"
                                title="Send Feedback"
                              >
                                <MessageSquare className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* NRC Detail Modal */}
      {isModalOpen && selectedNrc && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        NRC Details
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            NRC Number
                          </p>
                          <p className="text-lg font-semibold">
                            {selectedNrc.nrcNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Aircraft Number
                          </p>
                          <div className="flex items-center">
                            <Plane className="w-4 h-4 mr-1 text-gray-400" />
                            <p className="text-lg font-semibold">
                              {selectedNrc.aircraftNumber}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Status
                          </p>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              selectedNrc.status
                            )}`}
                          >
                            {selectedNrc.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Priority
                          </p>
                          <span
                            className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                              selectedNrc.priority
                            )}`}
                          >
                            {getPriorityIcon(selectedNrc.priority)}
                            {selectedNrc.priority}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Date
                          </p>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            <p>
                              {new Date(selectedNrc.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Reported By
                          </p>
                          <p>{selectedNrc.reportedBy}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">
                          Description
                        </p>
                        <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                          {selectedNrc.description}
                        </p>
                      </div>

                      {selectedNrc.images && selectedNrc.images.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Images
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {selectedNrc.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`NRC image ${index + 1}`}
                                className="h-24 w-full object-cover rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedNrc.feedback && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500">
                            Feedback/Comments
                          </p>
                          <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                            {selectedNrc.feedback}
                          </p>
                        </div>
                      )}
                    </div>

                    {showFeedbackForm ? (
                      <div className="mb-4">
                        <label
                          htmlFor="feedback"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Add Feedback or Query
                        </label>
                        <textarea
                          id="feedback"
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter your feedback, suggestion or query..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => setShowFeedbackForm(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleSubmitFeedback}
                          >
                            Submit Feedback
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-end space-x-2">
                        {selectedNrc.status === "pending" && (
                          <>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              onClick={() =>
                                handleNrcAction(selectedNrc.id, "accept")
                              }
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept NRC
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() =>
                                handleNrcAction(selectedNrc.id, "reject")
                              }
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject NRC
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          onClick={() => setShowFeedbackForm(true)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Add Feedback/Query
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNRC;
