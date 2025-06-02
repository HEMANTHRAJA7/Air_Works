"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

const ImageCarousel = ({ images, title = "Images" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  // Add keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowLeft":
          if (images.length > 1) prevModalImage()
          break
        case "ArrowRight":
          if (images.length > 1) nextModalImage()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, images.length])

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
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const openModal = (index) => {
    setModalImageIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const visibleImages = images.slice(currentIndex, currentIndex + 3)
  if (visibleImages.length < 3 && images.length > 3) {
    visibleImages.push(...images.slice(0, 3 - visibleImages.length))
  }

  return (
    <>
      <main className="container mx-auto py-10 ">
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
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </h3>
          </div>
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {visibleImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Image ${index}`}
                  className="w-full h-40 object-cover rounded-md cursor-pointer"
                  onClick={() => openModal((currentIndex + index) % images.length)}
                />
                <button
                  className="absolute bottom-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => openModal((currentIndex + index) % images.length)}
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Modal with highest z-index */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] md:top-[75px] lg:left-[275px] md:left-[75px] md:right-[15px] md:bottom-[15px]  top-[175px] m-3 bg-black bg-opacity-75 flex items-center justify-center p-4">
            {/* Close button positioned outside the image container */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-700" />
            </button>

            <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center">
              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[10000] p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[10000] p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Image container */}
              <div className="relative max-w-full max-h-full">
                <img
                  src={images[modalImageIndex] || "/placeholder.svg"}
                  alt={`Zoomed ${modalImageIndex + 1} of ${images.length}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: "calc(100vh - 8rem)" }}
                />

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                    {modalImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default ImageCarousel


// md:top-[75px] lg:left-[250px] md:left-[75px] md:right-[15px] md:bottom-[15px] top-[200px]