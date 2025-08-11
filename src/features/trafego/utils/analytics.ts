declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('⚠️ VITE_GA_MEASUREMENT_ID não encontrado no .env')
    return
  }

  window.dataLayer = window.dataLayer || []

  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    debug_mode: import.meta.env.DEV
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.onload = () => {}
  script.onerror = () => {
    console.error('❌ Erro ao carregar Google Analytics')
  }
  document.head.appendChild(script)
}

// Eventos específicos para rastreamento
export const trackProjectClick = (projectId: string, projectName?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'project_click', {
      event_category: 'projects',
      event_label: projectId,
      project_name: projectName,
      value: 1
    })

    if (import.meta.env.DEV) {
    }
  }
}

export const trackNavigationClick = (
  page: string,
  location: 'header' | 'footer' | 'mobile'
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'navigation_click', {
      event_category: 'navigation',
      event_label: `${page}_${location}`,
      page: page,
      location: location,
      value: 1
    })

    if (import.meta.env.DEV) {
      console.log('📊 Navigation Click:', { page, location })
    }
  }
}

export const trackContactAction = (
  action: 'form_submit' | 'email_click' | 'contact_page_view'
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'contact_interaction', {
      event_category: 'contact',
      event_label: action,
      value: 1
    })

    if (import.meta.env.DEV) {
      console.log('📊 Contact Action:', { action })
    }
  }
}

export const trackSocialClick = (
  platform: 'instagram' | 'youtube',
  location: 'header' | 'footer'
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'social_click', {
      event_category: 'social_media',
      event_label: `${platform}_${location}`,
      platform: platform,
      location: location,
      value: 1
    })

    if (import.meta.env.DEV) {
      console.log('📊 Social Click:', { platform, location })
    }
  }
}

export const trackDownload = (fileName: string, fileType: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'file_download', {
      event_category: 'downloads',
      event_label: fileName,
      file_type: fileType,
      value: 1
    })
  }
}

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    })
  }
}

// Função genérica para eventos customizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams
    })

    if (import.meta.env.DEV) {
      console.log('📊 Custom Event:', {
        action,
        category,
        label,
        value,
        customParams
      })
    }
  }
}
