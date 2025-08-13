import React from 'react'

interface LoadingSkeletonProps {
  count?: number
  className?: string
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 12,
  className = ''
}) => {
  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60']

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={`${heights[index % heights.length]} ${className}`}
        >
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
      ))}
    </>
  )
}

export const GridLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 12,
  className = ''
}) => {
  return (
    <div
      className={`columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 ${className}`}
    >
      <LoadingSkeleton count={count} />
    </div>
  )
}
