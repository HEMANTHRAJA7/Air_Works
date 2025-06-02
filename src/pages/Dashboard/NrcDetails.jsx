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
  Wrench,
  Timer,
  Settings,
} from "lucide-react"

import { mockNrcData } from "../../pages/Dashboard/data/nrc-data"
import ImageCarousel from "../../components/DashboardComponents/ViewingNrcPage/ImageCarousel"
import AttachmentList from "../../components/DashboardComponents/ViewingNrcPage/AttachmentList"
import FeedbackSection from "../../components/DashboardComponents/ViewingNrcPage/FeedbackSection"
import MaterialsAccordion from "../../components/DashboardComponents/ViewingNrcPage/MaterialAccordian"
import ToolsAccordion from "../../components/DashboardComponents/ViewingNrcPage/ToolAcordian"

const NrcDetail = () => {
  const { nrcId } = useParams()
  const navigate = useNavigate()
  const [nrc, setNrc] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [feedbackType, setFeedbackType] = useState("data-insufficient")
  const [feedbackDetails, setFeedbackDetails] = useState("")

  useEffect(() => {
    // Find the NRC by ID
    const foundNrc = mockNrcData.find((item) => item.id === nrcId)
    if (foundNrc) {
      setNrc(foundNrc)
    }
    setLoading(false)
  }, [nrcId])

  const updateMockData = (nrcId, updates) => {
    const nrcIndex = mockNrcData.findIndex((item) => item.id === nrcId)
    if (nrcIndex !== -1) {
      Object.assign(mockNrcData[nrcIndex], updates)
      setNrc(mockNrcData[nrcIndex])
    }
  }

  const handleNrcAction = (action, feedbackText = "") => {
    if (!nrc) return

    const updates = {}

    if (action === "accept") {
      updates.status = "accepted"
    } else if (action === "reject") {
      updates.status = "rejected"
    }

    updateMockData(nrc.id, updates)
    console.log(`NRC ${nrc.id} ${action}ed`, { feedbackText })
  }

  const handleSubmitFeedback = () => {
    if (feedback.trim() && nrc) {
      handleNrcAction("feedback", feedback)
      setFeedback("")
      setShowFeedbackForm(false)
      console.log("Customer feedback submitted:", feedback)
    }
  }

  const handleGoBack = () => {
    navigate("/dashboard/view-nrc")
  }

  // Modal handlers
  const handleAcceptConfirm = () => {
    handleNrcAction("accept")
    setShowAcceptModal(false)
  }

  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      handleNrcAction("reject", rejectReason)
      setShowRejectModal(false)
      setRejectReason("")
    }
  }

  const handleFeedbackSubmit = () => {
    if (feedbackDetails.trim() && nrc) {
      const newFeedback = {
        id: (nrc.feedbackConversations?.length || 0) + 1,
        customerFeedback: `${feedbackType}: ${feedbackDetails}`,
        engineerReply: null,
        customerTimestamp: "Just now",
        engineerTimestamp: null,
        createdAt: new Date().toISOString(),
      }

      const updatedConversations = [...(nrc.feedbackConversations || []), newFeedback]
      updateMockData(nrc.id, { feedbackConversations: updatedConversations })

      setShowFeedbackModal(false)
      setFeedbackDetails("")
      setFeedbackType("data-insufficient")
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to accept?</h3>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAcceptModal(false)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sticky Header with Actions */}
        <div className="sticky top-[65px] z-30 bg-white shadow-lg border-b-2 border-blue-600 py-3 mb-5 md:py-0 md:top-0">
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
                <h1 className="text-xl font-bold text-gray-900">NRC Detail</h1>
              </div>

              <div className="flex items-center space-x-3 ">
                {nrc.status === "pending" && (
                  <>
                    <button
                      onClick={() => setShowAcceptModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Feedback
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
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

          {/* Materials Section */}
          <MaterialsAccordion materials={nrc.materials} title="Materials" />

          {/* Tools Section */}
          <ToolsAccordion tools={nrc.tools} title="Tools" />

          {/* Feedback Section - Customer and Engineer */}
          <FeedbackSection feedbackConversations={nrc.feedbackConversations || []} />
        </div>
      </div>
    </div>
  )
}

export default NrcDetail
