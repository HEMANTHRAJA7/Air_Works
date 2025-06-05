"use client"

import { Download, Eye, FileText } from "lucide-react"

const AttachmentList = ({ attachments, title = "Attachments" }) => {
  if (!attachments || attachments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-gray-600" />
            {title}
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="p-4 bg-gray-50 rounded-md border min-h-[80px] flex items-center justify-center">
            <span className="text-sm text-gray-500">No attachments available</span>
          </div>
        </div>
      </div>
    )
  }

  const handlePreview = (attachment) => {
    console.log("Preview attachment:", attachment)
    alert(`Preview: ${attachment}`)
  }

  const handleDownload = (attachment) => {
    console.log("Download attachment:", attachment)
    alert(`Download: ${attachment}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-gray-600" />
          {title} ({attachments.length})
        </h3>
      </div>
      <div className="px-6 py-6">
        <div className="space-y-3">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{attachment}</h4>
                  <p className="text-sm text-gray-500">PDF Document</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreview(attachment)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(attachment)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AttachmentList
