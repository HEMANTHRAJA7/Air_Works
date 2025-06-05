import { useState } from "react"
import { MessageSquare, User, Clock, ChevronLeft, ChevronRight } from "lucide-react"

const FeedbackSection = ({ feedbackConversations = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no conversations, show empty state
  if (!feedbackConversations || feedbackConversations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            Feedback & Communication
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="text-center text-gray-500">No feedback conversations available</div>
        </div>
      </div>
    )
  }

  const nextConversation = () => {
    setCurrentIndex((prevIndex) => (prevIndex === feedbackConversations.length - 1 ? 0 : prevIndex + 1))
  }

  const prevConversation = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? feedbackConversations.length - 1 : prevIndex - 1))
  }

  const currentConversation = feedbackConversations[currentIndex]

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            Feedback & Communication
          </h3>
          {feedbackConversations.length > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevConversation}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {feedbackConversations.length}
              </span>
              <button
                onClick={nextConversation}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-6 space-y-4">
        {currentConversation.customerFeedback && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-blue-900">Customer Feedback</span>
                  <span className="text-xs text-blue-600 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentConversation.customerTimestamp || "Received"}
                  </span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">{currentConversation.customerFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {currentConversation.engineerReply && (
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
                    {currentConversation.engineerTimestamp || "Replied"}
                  </span>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">{currentConversation.engineerReply}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackSection
