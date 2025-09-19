// ================================
// External Imports
// ================================
import { useState, useCallback } from 'react'

// ================================
// Internal Imports
// ================================
import { ImageItem } from '../types'

// ================================
// Hook Interface
// ================================

/** Return type for useGridState hook */
interface UseGridStateReturn {
  // State
  images: ImageItem[]
  selectedImage: ImageItem | null
  loading: boolean
  error: string | null

  // Setters
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageItem | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string | null>>

  // Actions
  addImage: (image: ImageItem) => void
  removeImage: (id: string) => void
  updateImage: (id: string, updates: Partial<ImageItem>) => void
  clearImages: () => void

  // Handlers
  handleImageClick: (image: ImageItem) => void
  handleImageError: (image: ImageItem) => void
}

// ================================
// Custom Hook
// ================================

/**
 * Custom hook for managing grid state and image operations
 * @param initialImages - Initial array of images to populate the grid
 * @returns Object containing state, setters, actions, and event handlers
 */
export const useGridState = (
  initialImages: ImageItem[] = []
): UseGridStateReturn => {
  // ================================
  // State Management
  // ================================
  const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ================================
  // CRUD Operations
  // ================================

  /** Add a new image to the grid */
  const addImage = useCallback((image: ImageItem) => {
    setImages((prev) => [...prev, image])
  }, [])

  /** Remove an image from the grid by ID */
  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  /** Update an existing image with partial data */
  const updateImage = useCallback((id: string, updates: Partial<ImageItem>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    )
  }, [])

  /** Clear all images and reset selection */
  const clearImages = useCallback(() => {
    setImages([])
    setSelectedImage(null)
  }, [])

  // ================================
  // Event Handlers
  // ================================

  /** Handle image click to select it */
  const handleImageClick = useCallback((image: ImageItem) => {
    setSelectedImage(image)
  }, [])

  /** Handle image loading errors by removing the failed image */
  const handleImageError = useCallback(
    (image: ImageItem) => {
      console.warn(`Failed to load image: ${image.url}`)
      removeImage(image.id)
    },
    [removeImage]
  )

  // ================================
  // Return Hook API
  // ================================
  return {
    // State
    images,
    selectedImage,
    loading,
    error,

    // Setters
    setImages,
    setSelectedImage,
    setLoading,
    setError,

    // Actions
    addImage,
    removeImage,
    updateImage,
    clearImages,

    // Handlers
    handleImageClick,
    handleImageError
  }
}
