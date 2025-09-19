// ================================
// External Imports
// ================================
import { useEffect } from 'react'

// ================================
// Internal Imports
// ================================
import { useI18n } from '../contexts/I18nContext'

// ================================
// Types and Constants
// ================================

/** Available page keys for localized titles */
type PageKey = 'home' | 'about' | 'projects' | 'contact' | 'prints'

/** Base application name for title suffix */
const APP_NAME = 'Dark'

// ================================
// Document Title Hooks
// ================================

/**
 * Hook for setting document title using localized page titles
 * Automatically updates the browser tab title based on the current page
 * @param pageKey - Key corresponding to a page in the i18n translations
 */
export const useDocumentTitle = (pageKey: PageKey) => {
  const { t } = useI18n()

  useEffect(() => {
    const title = t.pages[pageKey].title
    document.title = `${title} - ${APP_NAME}`
  }, [t, pageKey])
}

/**
 * Hook for setting document title with custom title string
 * Useful for dynamic pages or pages not covered by main page translations
 * @param title - Custom title string to display
 */
export const useCustomDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - ${APP_NAME}`
  }, [title])
}
