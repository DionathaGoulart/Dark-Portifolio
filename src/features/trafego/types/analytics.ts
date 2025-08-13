export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  customParams?: Record<string, any>
}

export type NavigationLocation = 'header' | 'footer' | 'mobile'

export type ContactAction = 'form_submit' | 'email_click' | 'contact_page_view'

export type SocialPlatform = 'instagram' | 'youtube'

// ========= GLOBAL WINDOW TYPES =========
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
