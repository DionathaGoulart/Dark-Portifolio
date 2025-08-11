import React from 'react'

interface LoadingSkeletonProps {
  count?: number
  className?: string
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 12,
  className = ''
}) => {
  const skeletonHeights = [
    'h-48',
    'h-64',
    'h-56',
    'h-72',
    'h-52',
    'h-60',
    'h-68',
    'h-44',
    'h-80',
    'h-56',
    'h-64',
    'h-48'
  ]

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={`${skeletonHeights[index % skeletonHeights.length]} ${className}`}
        >
          <div className="w-full h-full bg-primary-white dark:bg-primary-black animate-pulse" />
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
      className={`columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 ${className}`}
    >
      {/* Alterado columns-1 para columns-2 para mostrar 2 colunas no mobile */}
      <LoadingSkeleton count={count} />
    </div>
  )
}
