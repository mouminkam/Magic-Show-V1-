'use client';

import Image from 'next/image';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedImage component with loading states and blur effect
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.priority - Load image with priority (default: false)
 * @param {string} props.fill - Use fill layout (default: false)
 * @param {string} props.sizes - Sizes attribute for responsive images
 * @param {number} props.quality - Image quality (1-100, default: 85)
 * @returns {JSX.Element}
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  width,
  height,
  className = '', 
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback image for errors
  const fallbackSrc = '/images/placeholder.jpg';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Image */}
      {fill ? (
        <Image
          src={hasError ? fallbackSrc : src}
          alt={alt}
          fill
          className={`transition-opacity duration-300 object-cover ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          quality={quality}
          sizes={sizes}
          {...props}
        />
      ) : (
        <Image
          src={hasError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          quality={quality}
          sizes={sizes}
          {...props}
        />
      )}

      {/* Error message (optional) */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400 text-sm">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  priority: PropTypes.bool,
  fill: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sizes: PropTypes.string,
  quality: PropTypes.number,
};

OptimizedImage.defaultProps = {
  className: '',
  priority: false,
  fill: false,
  quality: 85,
};
