import React from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// ================================
// MAIN COMPONENT
// ================================

/**
 * About page component that displays information about the application.
 * Uses internationalization for content and sets the document title.
 */
export const AboutPage: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('about')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-slide-up">
        <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
          {t.pages.about.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {t.pages.about.description}
          </p>
          <br />
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {t.pages.about.content}
          </p>
        </div>

        {/* Elemento decorativo */}
        <div className="mt-12 w-24 h-0.5 bg-primary-black dark:bg-primary-white"></div>
      </div>
    </div>
  )
}
