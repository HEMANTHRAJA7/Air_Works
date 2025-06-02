"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

const ImageCarousel = ({ images, title = "Images" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">{title}</h3>
        </div>
        <div className="px-6 py-6">
          <div className="text-center text-gray-500">No images available</div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const openModal = (index) => {
    setModalImageIndex(index)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset"
  }

  const nextModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const visibleImages = images.slice(currentIndex, currentIndex + 3)
  if (visibleImages.length < 3 && currentIndex > 0) {
    const remaining = 3 - visibleImages.length
    visibleImages.push(...images.slice(0, remaining))
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative z-10">
        <div className="px-6 py-4 bg-slate-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            <span>
              {title} ({images.length})
            </span>
            {images.length > 3 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevImage}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  disabled={images.length <= 3}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">
                  {Math.floor(currentIndex / 3) + 1} / {Math.ceil(images.length / 3)}
                </span>
                <button
                  onClick={nextImage}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  disabled={images.length <= 3}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleImages.map((image, index) => {
              const actualIndex = (currentIndex + index) % images.length
              return (
                <div key={actualIndex} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Image ${actualIndex + 1}`}
                    className="w-full h-48 object-cover rounded-lg border cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => openModal(actualIndex)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {actualIndex + 1} / {images.length}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal for enlarged image view - Fixed z-index and positioning */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-[10000] bg-black bg-opacity-50 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevModalImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-[10000] bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextModalImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-[10000] bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main image */}
            <img
              src={images[modalImageIndex] || "/placeholder.svg"}
              alt={`Enlarged view ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
              {modalImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageCarousel
