"use client"

import { useState } from "react"
import { ChevronDown, Package, Calendar, User, FileText } from "lucide-react"

const MaterialsAccordion = ({ materials, title = "Materials" }) => {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-emerald-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Package className="w-5 h-5 mr-2 text-emerald-600" />
            {title} (0)
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="text-center text-gray-500">No materials available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-emerald-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2 text-emerald-600" />
          {title} ({materials.length})
        </h3>
      </div>
      <div className="px-6 py-6">
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(material.id)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{material.description}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Part No:</span> {material.offPartNo}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {material.reqOnPartType}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-1.5 py-0.5 text-xs rounded-full ${
                          material.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {material.status}
                      </span>
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openItems[material.id] ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {openItems[material.id] && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Part Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Part Information
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">Off Part No:</span>
                          <div className="text-gray-900">{material.offPartNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Off S/No:</span>
                          <div className="text-gray-900">{material.offSNo || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">REQ/ON Part No:</span>
                          <div className="text-gray-900">{material.reqOnPartNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">REQ/ON Part Type:</span>
                          <div className="text-gray-900">{material.reqOnPartType}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Alternate Part No:</span>
                          <div className="text-gray-900">{material.alternatePartNo || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">ON S/No:</span>
                          <div className="text-gray-900">{material.onSNo || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Doc Type:</span>
                          <div className="text-gray-900">{material.docType || "-"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Status */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Quantity & Status
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">Doc Ref No:</span>
                          <div className="text-gray-900">{material.docRefNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">POS:</span>
                          <div className="text-gray-900">{material.pos}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Available QTY:</span>
                          <div className="text-gray-900">{material.availableQty}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">REQ QTY:</span>
                          <div className="text-gray-900">{material.reqQty}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">UOM:</span>
                          <div className="text-gray-900">{material.uom}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Used QTY:</span>
                          <div className="text-gray-900">{material.usedQty}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Status:</span>
                          <div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                material.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {material.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tracking & Updates */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        Tracking & Updates
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 flex items-center font-medium">
                            <Calendar className="w-3 h-3 mr-1" />
                            Need Date:
                          </span>
                          <div className="text-gray-900">{material.needDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Traceability Ref #:</span>
                          <div className="text-gray-900">{material.traceabilityRef}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Reason:</span>
                          <div className="text-gray-900">{material.reason || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">GRN NO:</span>
                          <div className="text-gray-900">{material.grnNo || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Material Issue No:</span>
                          <div className="text-gray-900">{material.materialIssueNo || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">Inward#:</span>
                          <div className="text-gray-900">{material.inward || "-"}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 flex items-center font-medium">
                            <User className="w-3 h-3 mr-1" />
                            Updated By:
                          </span>
                          <div className="text-gray-900 text-xs break-all">{material.updatedBy}</div>
                        </div>
                        {material.fileList && (
                          <div>
                            <span className="text-gray-500 flex items-center font-medium">
                              <FileText className="w-3 h-3 mr-1" />
                              File List:
                            </span>
                            <div className="text-blue-600 underline cursor-pointer">{material.fileList}</div>
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

export default MaterialsAccordion
