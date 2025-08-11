import { useI18n } from '@/shared/contexts/I18nContext'
import React from 'react'

export const LoadingSpinner: React.FC = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-primary-black dark:border-primary-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-primary-black/60 dark:text-primary-white/60">
        {t.common.loading}
      </p>
    </div>
  )
}
