import { useState, useCallback } from 'react'
import { ImageItem } from '../types'

export const useGridState = (initialImages: ImageItem[] = []) => {
  const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addImage = useCallback((image: ImageItem) => {
    setImages((prev) => [...prev, image])
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  const updateImage = useCallback((id: string, updates: Partial<ImageItem>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    )
  }, [])

  const clearImages = useCallback(() => {
    setImages([])
    setSelectedImage(null)
  }, [])

  const handleImageClick = useCallback((image: ImageItem) => {
    setSelectedImage(image)
  }, [])

  const handleImageError = useCallback(
    (image: ImageItem) => {
      console.warn(`Failed to load image: ${image.url}`)
      removeImage(image.id)
    },
    [removeImage]
  )

  return {
    images,
    selectedImage,
    loading,
    error,
    setImages,
    setSelectedImage,
    setLoading,
    setError,
    addImage,
    removeImage,
    updateImage,
    clearImages,
    handleImageClick,
    handleImageError
  }
}
