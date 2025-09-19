import React from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// ================================
// INTERFACES & TYPES
// ================================

interface PrintsPageProps {
  className?: string
}

// ================================
// SUB COMPONENTS
// ================================

/**
 * Decorative divider element
 */
const DecorativeDivider: React.FC<{ className?: string }> = ({
  className = ''
}) => (
  <div
    className={`mt-12 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto ${className}`}
  />
)

/**
 * Page header with title and subtitle
 */
const PageHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle
}) => (
  <div className="text-center animate-fade-in">
    <h1 className="text-5xl font-bold text-primary-black dark:text-primary-white mb-6 tracking-tight">
      {title}
    </h1>
    <p className="text-xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl mx-auto leading-relaxed">
      {subtitle}
    </p>
    <DecorativeDivider />
  </div>
)

// ================================
// MAIN COMPONENT
// ================================

/**
 * Prints page component displaying available prints information
 * Simple layout with title, subtitle, and decorative elements
 */
export const PrintsPage: React.FC<PrintsPageProps> = ({ className = '' }) => {
  const { t } = useI18n()
  useDocumentTitle('prints')

  // ================================
  // COMPUTED VALUES
  // ================================

  const containerClasses = [
    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDER
  // ================================

  return (
    <div className={containerClasses}>
      <PageHeader
        title={t.pages.prints.title}
        subtitle={t.pages.prints.subtitle}
      />
    </div>
  )
}
