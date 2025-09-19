import React from 'react'
import { Languages } from 'lucide-react'
import { useI18n } from '@/shared/contexts/I18nContext'

// ================================
// INTERFACES & TYPES
// ================================

interface LanguageSwitchProps {
  className?: string
}

// ================================
// CONSTANTS
// ================================

const languageLabels = {
  pt: 'Português',
  en: 'English'
} as const

const languageDisplayNames = {
  pt: 'PT',
  en: 'EN'
} as const

// ================================
// MAIN COMPONENT
// ================================

/**
 * Language switch component that toggles between Portuguese and English
 * Uses the I18n context to manage language state
 */
export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  className = ''
}) => {
  const { language, setLanguage, t } = useI18n()

  // ================================
  // HANDLERS
  // ================================

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  // ================================
  // COMPUTED VALUES
  // ================================

  const currentLanguageLabel = languageLabels[language]
  const displayName = languageDisplayNames[language]

  const ariaLabel = `${t.footer.language}: ${currentLanguageLabel}`

  const buttonClasses = [
    'flex items-center space-x-2 px-3 py-2 text-sm',
    'text-primary-black dark:text-primary-white',
    'hover:text-primary-black/70 dark:hover:text-primary-white/70',
    'transition-colors duration-200',
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDER
  // ================================

  return (
    <button
      onClick={toggleLanguage}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      <Languages size={16} />
      <span className="font-medium">{displayName}</span>
    </button>
  )
}
