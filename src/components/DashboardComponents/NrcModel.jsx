"use client"

import { useState } from "react"
import { Check, X, MessageSquare, Calendar, Plane, AlertTriangle, Clock } from "lucide-react"

const NrcModal = ({ isOpen, onClose, selectedNrc, onAction, initialShowFeedbackForm = false }) => {
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(initialShowFeedbackForm)

  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmitFeedback = () => {
    if (feedback.trim() && selectedNrc) {
      onAction(selectedNrc.id, "feedback", feedback)
      setFeedback("")
      setShowFeedbackForm(false)
    }
  }

  if (!isOpen || !selectedNrc) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">NRC Details</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">NRC Number</p>
                      <p className="text-lg font-semibold">{selectedNrc.nrcNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Aircraft Number</p>
                      <div className="flex items-center">
                        <Plane className="w-4 h-4 mr-1 text-gray-400" />
                        <p className="text-lg font-semibold">{selectedNrc.aircraftNumber}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          selectedNrc.status,
                        )}`}
                      >
                        {selectedNrc.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Priority</p>
                      <span
                        className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                          selectedNrc.priority,
                        )}`}
                      >
                        {getPriorityIcon(selectedNrc.priority)}
                        {selectedNrc.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        <p>{new Date(selectedNrc.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reported By</p>
                      <p>{selectedNrc.reportedBy}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedNrc.description}</p>
                  </div>

                  {selectedNrc.images && selectedNrc.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Images</p>
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
                      <p className="text-sm font-medium text-gray-500">Feedback/Comments</p>
                      <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedNrc.feedback}</p>
                    </div>
                  )}
                </div>

                {showFeedbackForm ? (
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
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
                          onClick={() => onAction(selectedNrc.id, "accept")}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accept NRC
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => onAction(selectedNrc.id, "reject")}
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
  )
}

export default NrcModal
