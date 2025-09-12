import logoOptimized from '@assets/logo.webp'

export const Logo: React.FC<{
  src?: string
  alt?: string
  invertOnDark?: boolean
}> = ({ src, alt = 'Dark Logo', invertOnDark = true }) => (
  <div className="flex items-center">
    <img
      src={src || logoOptimized}
      alt={alt}
      className={`
        h-14 sm:h-16 w-auto object-contain transition-all duration-300
        ${invertOnDark ? 'invert dark:filter-none' : ''}
      `}
      decoding="async"
      fetchPriority="high"
    />
  </div>
)
