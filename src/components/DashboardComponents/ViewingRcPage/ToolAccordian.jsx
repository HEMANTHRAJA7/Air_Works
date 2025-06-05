"use client"

import { useState } from "react"
import { ChevronDown, Wrench, Calendar, User, FileText, AlertCircle } from "lucide-react"

const ToolsAccordion = ({ tools, title = "Tools" }) => {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "calibrated":
        return "bg-green-100 text-green-800"
      case "due for calibration":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "due for calibration":
      case "overdue":
        return <AlertCircle className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-blue-600" />
            {title} (0)
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="text-center text-gray-500">No tools available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Wrench className="w-5 h-5 mr-2 text-blue-600" />
          {title} ({tools.length})
        </h3>
      </div>
      <div className="px-6 py-6">
        <div className="space-y-3">
          {tools.map((tool) => (
            <div key={tool.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(tool.id)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{tool.description}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Part No:</span> {tool.toolPartNo}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Serial:</span> {tool.toolSerialNo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(tool.toolStatus)}`}
                  >
                    {getStatusIcon(tool.toolStatus)}
                    {tool.toolStatus}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openItems[tool.id] ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {openItems[tool.id] && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tool Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Tool Information
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">Tool Part No:</span>
                          <div className="text-gray-900">{tool.toolPartNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Tool Serial No:</span>
                          <div className="text-gray-900">{tool.toolSerialNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Description:</span>
                          <div className="text-gray-900">{tool.description}</div>
                        </div>
                      </div>
                    </div>

                    {/* Calibration & Status */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Calibration & Status
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 flex items-center font-medium">
                            <Calendar className="w-3 h-3 mr-1" />
                            Calibration Date:
                          </span>
                          <div className="text-gray-900">{tool.calibrationDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 flex items-center font-medium">
                            <Calendar className="w-3 h-3 mr-1" />
                            Need Date:
                          </span>
                          <div className="text-gray-900">{tool.needDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Tool Status:</span>
                          <div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${getStatusColor(
                                tool.toolStatus,
                              )}`}
                            >
                              {getStatusIcon(tool.toolStatus)}
                              {tool.toolStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Additional Information
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">Remarks:</span>
                          <div className="text-gray-900">{tool.remarks || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 flex items-center font-medium">
                            <User className="w-3 h-3 mr-1" />
                            Updated By:
                          </span>
                          <div className="text-gray-900 text-xs break-all">{tool.updatedBy}</div>
                        </div>
                        {tool.fileList && (
                          <div>
                            <span className="text-gray-500 flex items-center font-medium">
                              <FileText className="w-3 h-3 mr-1" />
                              File List:
                            </span>
                            <div className="text-blue-600 underline cursor-pointer">{tool.fileList}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToolsAccordion
