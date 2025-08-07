import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const PropertyGallery = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-200">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3"
        >
          <ApperIcon name="ChevronLeft" size={20} />
        </Button>
        <Button
          variant="ghost"
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3"
        >
          <ApperIcon name="ChevronRight" size={20} />
        </Button>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-3"
        >
          <ApperIcon name="Expand" size={20} />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-accent-500 opacity-100"
                : "border-gray-300 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
              <img
                src={images[currentIndex]}
                alt={alt}
                className="w-full h-full object-contain"
              />
              
              <Button
                variant="ghost"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
              >
                <ApperIcon name="X" size={24} />
              </Button>
              
              <Button
                variant="ghost"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
              >
                <ApperIcon name="ChevronLeft" size={24} />
              </Button>
              
              <Button
                variant="ghost"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
              >
                <ApperIcon name="ChevronRight" size={24} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PropertyGallery