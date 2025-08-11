import React from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'

export const LayoutFooter: React.FC = () => {
  const { t } = useI18n()

  return (
    <footer className="bg-primary-white dark:bg-primary-black transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center text-primary-black dark:text-primary-white">
            <p className="font-medium tracking-wide">{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
