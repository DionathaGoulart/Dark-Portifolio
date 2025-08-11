import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import React from 'react'

export const PrintsPage: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('prints')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl font-bold text-primary-black dark:text-primary-white mb-6 tracking-tight">
          {t.pages.prints.title}
        </h1>
        <p className="text-xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl mx-auto leading-relaxed">
          {t.pages.prints.subtitle}
        </p>
        {/* Elemento decorativo minimalista */}
        <div className="mt-12 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto"></div>
      </div>
    </div>
  )
}
