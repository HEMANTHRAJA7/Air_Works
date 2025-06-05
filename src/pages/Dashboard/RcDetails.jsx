import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Plane, Clock, User, FileText, Wrench, Timer, Settings } from "lucide-react"

import { mockRcData } from "../Dashboard/data/rc-data"
import AttachmentList from "../../components/DashboardComponents/ViewingRcPage/AttachmentList"
import MaterialsAccordion from "../../components/DashboardComponents/ViewingRcPage/MarerialAccordian"
import ToolsAccordion from "../../components/DashboardComponents/ViewingRcPage/ToolAccordian"

const RcDetail = () => {
  const { rcId } = useParams()
  const navigate = useNavigate()
  const [rc, setRc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the RC by ID
    const foundRc = mockRcData.find((item) => item.id === rcId)
    if (foundRc) {
      setRc(foundRc)
    }
    setLoading(false)
  }, [rcId])

  const handleGoBack = () => {
    navigate("/dashboard/routine-card")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Routine Card details...</p>
        </div>
      </div>
    )
  }

  if (!rc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Routine Card Not Found</h2>
          <p className="text-gray-600 mb-6">The requested Routine Card could not be found.</p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Routine Card List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sticky Header */}
        <div className="sticky top-[65px] z-[9980] bg-white shadow-lg border-b-2 border-blue-600 py-3 mb-5 md:py-0 md:top-0">
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
                <h1 className="text-xl font-bold text-gray-900">Routine Card Detail</h1>
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
                Routine Card Information
              </h3>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RC #</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm font-mono text-gray-900">{rc.rcNumber}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trade to Action</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.tradeToAction}</span>
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
                    <span className="text-sm text-gray-900">{rc.reportedBy}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Created</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{new Date(rc.date).toLocaleDateString()}</span>
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
                    <span className="text-sm font-semibold text-gray-900">{rc.aircraftNumber}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft Model</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.aircraftModel}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm font-semibold text-gray-900">{rc.customerName}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ATA</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.ata}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub-ATA</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.subAta}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auth No</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.authNo}</span>
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
                    <span className="text-sm text-gray-900">{rc.tradeToAction}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visit Package #</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.visitPackage || "-"}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Finding from Task No.</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.findingFromTaskNo}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duplicate Insp Req?</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.duplicateInspReq}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zone / Trade</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.zoneTradeCode}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Task</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.subTask}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authority of Certification</label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-sm text-gray-900">{rc.authorityOfCertification}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{rc.time}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Man Hours</label>
                  <div className="p-3 bg-gray-50 rounded-md border flex items-center">
                    <Timer className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{rc.estimatedManHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call Out Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-600" />
                Call Out Details ({rc.callOuts?.length || 0})
              </h3>
            </div>
            <div className="px-6 py-6 space-y-4">
              {rc.callOuts && rc.callOuts.length > 0 ? (
                rc.callOuts.map((callOut) => (
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

          {/* Action Taken Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-indigo-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-indigo-600" />
                Actions Taken ({rc.actionsTaken?.length || 0})
              </h3>
            </div>
            <div className="px-6 py-6 space-y-4">
              {rc.actionsTaken && rc.actionsTaken.length > 0 ? (
                rc.actionsTaken.map((action) => (
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

          {/* OEM Instruction Attachments */}
          <AttachmentList attachments={rc.oemInstructionAttachments} title="OEM Instruction Attachments" />

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
                {rc.maintenanceData ? (
                  <span className="text-sm text-gray-900">{rc.maintenanceData}</span>
                ) : (
                  <span className="text-sm text-gray-500">No maintenance data available</span>
                )}
              </div>
            </div>
          </div>

          {/* Materials Section */}
          <MaterialsAccordion materials={rc.materials} title="Materials" />

          {/* Tools Section */}
          <ToolsAccordion tools={rc.tools} title="Tools" />
        </div>
      </div>
    </div>
  )
}

export default RcDetail
