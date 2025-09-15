import { useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'

type PageKey = 'home' | 'about' | 'projects' | 'contact' | 'prints'

// Versão original para páginas principais
export const useDocumentTitle = (pageKey: PageKey) => {
  const { t } = useI18n()

  useEffect(() => {
    const title = t.pages[pageKey].title
    document.title = `${title} - Dark`
  }, [t, pageKey])
}

// Nova versão para páginas com título customizado
export const useCustomDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Dark`
  }, [title])
}
