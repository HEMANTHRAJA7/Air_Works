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
  Wrench,
  Timer,
  Settings,
} from "lucide-react"

import { mockNrcData } from "./data/nrc-data"
import ImageCarousel from "../../components/DashboardComponents/ViewingNrcPage/ImageCarousel"
import AttachmentList from "../../components/DashboardComponents/ViewingNrcPage/AttachmentList"
import FeedbackSection from "../../components/DashboardComponents/ViewingNrcPage/FeedbackSection"

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

  const handleNrcAction = (action, feedbackText = "") => {
    if (!nrc) return

    const updatedStatus = action === "accept" ? "accepted" : action === "reject" ? "rejected" : nrc.status

    setNrc((prev) => ({
      ...prev,
      status: updatedStatus,
      engineerReply: feedbackText || prev.engineerReply,
    }))

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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to NRC List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Header with Actions */}
      <div className="sticky top-[65px] z-0 bg-white shadow-lg border-b-2 border-blue-600 py-3 md:py-0 md:top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[30%px] flex-col md:flex-row space-y-4 md:space-y-0 md:h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">UPDATE NRC</h1>
            </div>

            <div className="flex items-center space-x-3 ">
              {nrc.status === "pending" && (
                <>
                  <button
                    onClick={() => handleNrcAction("accept")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleNrcAction("reject")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="mb-6 bg-white rounded-lg shadow-md border border-blue-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
              <h3 className="text-lg font-medium text-gray-900">Add Feedback</h3>
            </div>
            <div className="px-6 py-4">
              <textarea
                rows={4}
                className="block w-full rounded-md border-gray-500 p-3 shadow-sm sm:text-sm"
                placeholder="Enter your feedback, suggestion or query..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedback.trim()}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                NRC Information
              </h3>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NRC #</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm font-mono text-gray-900">{nrc.nrcNumber}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        nrc.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : nrc.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {nrc.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        nrc.priority === "critical"
                          ? "bg-red-100 text-red-800"
                          : nrc.priority === "high"
                            ? "bg-orange-100 text-orange-800"
                            : nrc.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {nrc.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Create/Edit NDT Insp</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">-</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reported By</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{nrc.reportedBy}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Created</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{new Date(nrc.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aircraft Information Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-green-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Plane className="w-5 h-5 mr-2 text-green-600" />
                Aircraft Information
              </h3>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft Regn</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm font-semibold text-gray-900">{nrc.aircraftNumber}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft Model</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.aircraftModel}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm font-semibold text-gray-900">{nrc.customerName}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ATA</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.ata}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub-ATA</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.subAta}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auth No</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.authNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Package Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-purple-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Work Package Information
              </h3>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trade to Action</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.tradeToAction}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visit Package #</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.visitPackage || "-"}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Finding from Task No.</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.findingFromTaskNo}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duplicate Insp Req?</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.duplicateInspReq}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zone / Trade</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.zoneTradeCode}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Task</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.subTask}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authority of Certification</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{nrc.authorityOfCertification}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{nrc.time}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Man Hours</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Timer className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{nrc.estimatedManHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call Out Section - Multiple Call Outs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Call Out Details ({nrc.callOuts?.length || 0})
              </h3>
            </div>
            <div className="px-6 py-6 space-y-4">
              {nrc.callOuts && nrc.callOuts.length > 0 ? (
                nrc.callOuts.map((callOut) => (
                  <div key={callOut.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{callOut.title}</label>
                    <div className="p-4 bg-gray-50 rounded-md border">
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{callOut.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-md border">
                  <p className="text-sm text-gray-500">No call out details available</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Taken Section - Multiple Actions */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-indigo-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-indigo-600" />
                Actions Taken ({nrc.actionsTaken?.length || 0})
              </h3>
            </div>
            <div className="px-6 py-6 space-y-4">
              {nrc.actionsTaken && nrc.actionsTaken.length > 0 ? (
                nrc.actionsTaken.map((action) => (
                  <div key={action.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{action.title}</label>
                    <div className="p-4 bg-gray-50 rounded-md border">
                      <p className="text-sm text-gray-900 whitespace-pre-line">{action.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-md border">
                  <p className="text-sm text-gray-500">No actions taken yet</p>
                </div>
              )}
            </div>
          </div>

          {/* OEM Instruction Attachments with Preview/Download */}
          <AttachmentList attachments={nrc.oemInstructionAttachments} title="OEM Instruction Attachments" />

          {/* Maintenance Data */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-teal-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-teal-600" />
                Maintenance Data
              </h3>
            </div>
            <div className="px-6 py-6">
              <div className="p-4 bg-gray-50 rounded-md border min-h-[100px]">
                {nrc.maintenanceData ? (
                  <span className="text-sm text-gray-900">{nrc.maintenanceData}</span>
                ) : (
                  <span className="text-sm text-gray-500">No maintenance data available</span>
                )}
              </div>
            </div>
          </div>

          {/* Images Section with Carousel */}
          <ImageCarousel images={nrc.images} title="Images" />

          {/* Feedback Section - Customer and Engineer */}
          <FeedbackSection customerFeedback={nrc.customerFeedback} engineerReply={nrc.engineerReply} />
        </div>
      </div>
    </div>
  )
}

export default NrcDetail
