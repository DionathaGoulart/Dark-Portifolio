import React from 'react'
import { Languages } from 'lucide-react'
import { useI18n } from '@/shared/contexts/I18nContext'

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useI18n()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm text-primary-black dark:text-primary-white hover:text-primary-black/70 dark:hover:text-primary-white/70 transition-colors duration-200"
      aria-label={`${t.footer.language}: ${language === 'pt' ? 'Português' : 'English'}`}
    >
      <Languages size={16} />
      <span className="font-medium">{language === 'pt' ? 'PT' : 'EN'}</span>
    </button>
  )
}
