"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Check,
  X,
  MessageSquare,
  Calendar,
  Plane,
  AlertTriangle,
  Clock,
  User,
  FileText,
  ImageIcon,
} from "lucide-react"

import { mockNrcData } from "../../pages/Dashboard/data/nrc-data"

const NrcDetail = () => {
  const { nrcId } = useParams()
  const navigate = useNavigate()
  const [nrc, setNrc] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the NRC by ID
    const foundNrc = mockNrcData.find((item) => item.id === nrcId)
    if (foundNrc) {
      setNrc(foundNrc)
    }
    setLoading(false)
  }, [nrcId])

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
        return <AlertTriangle className="w-5 h-5 mr-2 text-red-800" />
      case "high":
        return <AlertTriangle className="w-5 h-5 mr-2 text-orange-800" />
      case "medium":
        return <Clock className="w-5 h-5 mr-2 text-yellow-800" />
      case "low":
        return <Clock className="w-5 h-5 mr-2 text-green-800" />
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

  const handleNrcAction = (action, feedbackText = "") => {
    if (!nrc) return

    const updatedStatus = action === "accept" ? "accepted" : action === "reject" ? "rejected" : nrc.status

    setNrc((prev) => ({
      ...prev,
      status: updatedStatus,
      feedback: feedbackText || prev.feedback,
    }))

    // You might want to make an API call here to update the backend
    console.log(`NRC ${nrc.id} ${action}ed`, { feedbackText })
  }

  const handleSubmitFeedback = () => {
    if (feedback.trim() && nrc) {
      handleNrcAction("feedback", feedback)
      setFeedback("")
      setShowFeedbackForm(false)
    }
  }

  const handleGoBack = () => {
    navigate("/dashboard/view-nrc")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading NRC details...</p>
        </div>
      </div>
    )
  }

  if (!nrc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">NRC Not Found</h2>
          <p className="text-gray-600 mb-6">The requested NRC could not be found.</p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to NRC List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </button>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">NRC Details - {nrc.nrcNumber}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${getStatusColor(
                  nrc.status,
                )}`}
              >
                {nrc.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">NRC Number</label>
                    <div className="mt-1 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">{nrc.nrcNumber}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Aircraft Number</label>
                    <div className="mt-1 flex items-center">
                      <Plane className="w-5 h-5 mr-2 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">{nrc.aircraftNumber}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Priority</label>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full border ${getPriorityColor(
                          nrc.priority,
                        )}`}
                      >
                        {getPriorityIcon(nrc.priority)}
                        {nrc.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Date Reported</label>
                    <div className="mt-1 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(nrc.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500">Reported By</label>
                    <div className="mt-1 flex items-center">
                      <User className="w-5 h-5 mr-2 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">{nrc.reportedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Description</h3>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-900 whitespace-pre-line leading-relaxed">{nrc.description}</p>
              </div>
            </div>

            {/* Images Card */}
            {nrc.images && nrc.images.length > 0 && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Attached Images ({nrc.images.length})
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nrc.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => {
                          // You can implement a lightbox or modal here
                          window.open(image || "/placeholder.svg", "_blank")
                        }}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`NRC image ${index + 1}`}
                          className="h-48 w-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            {nrc.feedback && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Feedback & Comments</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-900 whitespace-pre-line leading-relaxed">{nrc.feedback}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Actions</h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                {/* Action Buttons */}
                {nrc.status === "pending" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNrcAction("accept")}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept NRC
                    </button>
                    <button
                      onClick={() => handleNrcAction("reject")}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject NRC
                    </button>
                  </div>
                )}

                {/* Feedback Form */}
                {showFeedbackForm ? (
                  <div className="space-y-3">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                      Add Feedback or Query
                    </label>
                    <textarea
                      id="feedback"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your feedback, suggestion or query..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowFeedbackForm(false)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitFeedback}
                        disabled={!feedback.trim()}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2D3FA6] hover:bg-[#283780] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Feedback/Query
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NrcDetail
