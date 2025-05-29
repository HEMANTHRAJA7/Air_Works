import { MessageSquare, User, Clock } from "lucide-react"

const FeedbackSection = ({ customerFeedback, engineerReply }) => {
  if (!customerFeedback && !engineerReply) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Feedback & Communication
        </h3>
      </div>
      <div className="px-6 py-6 space-y-4">
        {customerFeedback && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-orange-900">Customer Feedback</span>
                  <span className="text-xs text-orange-600 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Received
                  </span>
                </div>
                <p className="text-sm text-orange-800 leading-relaxed">{customerFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {engineerReply && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-green-900">Engineer Reply</span>
                  <span className="text-xs text-green-600 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Replied
                  </span>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">{engineerReply}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackSection
