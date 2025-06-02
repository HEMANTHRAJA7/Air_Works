import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const ImageCarousel = ({ images, title = "Images" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  const prevModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          if (images.length > 1) prevModalImage();
          break;
        case "ArrowRight":
          if (images.length > 1) nextModalImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal, prevModalImage, nextModalImage, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            {title}
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="text-center text-gray-500">No images available</div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const visibleImages = images.slice(currentIndex, currentIndex + 3);
  if (visibleImages.length < 3 && images.length > 3) {
    visibleImages.push(...images.slice(0, 3 - visibleImages.length));
  }

  return (
    <>
      <main className="container mx-auto py-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative z-10">
          <div className="px-6 py-4 bg-slate-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevImage}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visibleImages.map((img, index) => (
              <div
                key={index}
                className="relative cursor-pointer group"
                onClick={() =>
                  openModal((currentIndex + index) % images.length)
                }
              >
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="rounded-md w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <ZoomIn className="text-white w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] md:top-[50px] lg:left-[275px] md:left-[75px] md:right-[20px] top-[165px] bottom-[10px] m-9 bg-black bg-opacity-75 rounded-lg flex items-center justify-center p-4">
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
    </>
  );
};

export default ImageCarousel;

