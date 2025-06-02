import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  return (
    <div className="relative">
      <div className="relative rounded-xl overflow-hidden aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-transform cursor-zoom-in ${isZoomed ? 'scale-150' : 'scale-100'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleZoom}
          />
        </AnimatePresence>
        
        {/* Zoom indicator */}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/10 transition-colors"
          onClick={toggleZoom}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-16 h-16 rounded-md overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-primary' : 'opacity-70'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;