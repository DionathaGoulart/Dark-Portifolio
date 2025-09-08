import React from 'react'

// Interfaces e tipos
interface ImageData {
  src: string
  alt?: string
}

type AspectRatio = '1/1' | '16/9' | '4/3' | '3/2' | '2/1' | '3/4' | '9/16'
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'
type Columns = 2 | 3
type TwoColumnLayout = 'equal' | 'left-dominant' | 'right-dominant'

interface ImageGridProps {
  images: ImageData[]
  columns: Columns
  twoColumnLayout?: TwoColumnLayout
  aspectRatio?: AspectRatio
  objectFit?: ObjectFit
  rounded?: Rounded
  gap?: Gap
  className?: string
}

// Mapeamentos para classes Tailwind
const aspectRatioClasses: Record<AspectRatio, string> = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '2/1': 'aspect-[2/1]',
  '3/4': 'aspect-[3/4]',
  '9/16': 'aspect-[9/16]'
}

const objectFitClasses: Record<ObjectFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
}

const roundedClasses: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}

const gapClasses: Record<Gap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12'
}

const twoColumnLayoutClasses: Record<TwoColumnLayout, string> = {
  equal: 'grid-cols-2',
  'left-dominant': 'grid-cols-[2fr_1fr]',
  'right-dominant': 'grid-cols-[1fr_2fr]'
}

// Componente ImageGrid
const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns,
  twoColumnLayout = 'equal',
  aspectRatio = '16/9',
  objectFit = 'cover',
  rounded = 'none',
  gap = '1',
  className = ''
}) => {
  const getGridClasses = (): string => {
    if (columns === 2) {
      return twoColumnLayoutClasses[twoColumnLayout]
    }
    return 'grid-cols-3'
  }

  const gridClasses = `
    grid
    ${getGridClasses()}
    ${gapClasses[gap]}
    ${className}
  `.trim()

  const imageClasses = `
    w-full
    h-full
    ${aspectRatioClasses[aspectRatio]}
    ${objectFitClasses[objectFit]}
    ${roundedClasses[rounded]}
  `.trim()

  return (
    <div className={gridClasses}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`overflow-hidden ${roundedClasses[rounded]}`}
        >
          <img
            src={image.src}
            alt={image.alt || `Imagem ${index + 1}`}
            className={imageClasses}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
