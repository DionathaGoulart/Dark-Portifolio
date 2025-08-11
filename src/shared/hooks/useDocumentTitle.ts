import { useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'

export const useDocumentTitle = (
  pageKey: keyof typeof import('../translations/pt').ptTranslations.pages
) => {
  const { t } = useI18n()

  useEffect(() => {
    const title = t.pages[pageKey].title
    document.title = `${title} - Dark`
  }, [t, pageKey])
}
