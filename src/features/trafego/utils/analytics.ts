import {
  AnalyticsEvent,
  ContactAction,
  NavigationLocation,
  SocialPlatform
} from '../types/analytics'

// ========= ANALYTICS CLASS =========
class Analytics {
  private measurementId: string
  private isInitialized = false
  private isDev = import.meta.env.DEV

  constructor() {
    this.measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  }

  // ========= INICIALIZAÇÃO =========
  init(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.measurementId) {
        console.warn('⚠️ Google Analytics ID não encontrado')
        resolve(false)
        return
      }

      if (this.isInitialized) {
        resolve(true)
        return
      }

      this.setupGoogleAnalytics()
      this.loadGoogleAnalyticsScript(resolve)
    })
  }

  private setupGoogleAnalytics(): void {
    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args) => window.dataLayer.push(args)

    // Configurar GA
    window.gtag('js', new Date())
    window.gtag('config', this.measurementId, {
      send_page_view: true,
      debug_mode: this.isDev
    })
  }

  private loadGoogleAnalyticsScript(resolve: (value: boolean) => void): void {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`

    script.onload = () => {
      this.isInitialized = true
      this.log('✅ Google Analytics inicializado')
      resolve(true)
    }

    script.onerror = () => {
      console.error('❌ Erro ao carregar Google Analytics')
      resolve(false)
    }

    document.head.appendChild(script)
  }

  // ========= TRACKING GENÉRICO =========
  track(event: AnalyticsEvent): void {
    if (!this.canTrack()) return

    const { action, category, label, value, customParams } = event

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value || 1,
      ...customParams
    })

    this.log('📊 Event tracked:', event)
  }

  trackPageView(path: string, title?: string): void {
    if (!this.canTrack()) return

    window.gtag('config', this.measurementId, {
      page_path: path,
      page_title: title || document.title
    })

    this.log('📄 Page view:', { path, title })
  }

  // ========= TRACKING ESPECÍFICO =========
  trackProject(projectId: string, projectName?: string): void {
    this.track({
      action: 'project_click',
      category: 'projects',
      label: projectId,
      customParams: { project_name: projectName }
    })
  }

  trackNavigation(page: string, location: NavigationLocation): void {
    this.track({
      action: 'navigation_click',
      category: 'navigation',
      label: `${page}_${location}`,
      customParams: { page, location }
    })
  }

  trackContact(action: ContactAction): void {
    this.track({
      action: 'contact_interaction',
      category: 'contact',
      label: action
    })
  }

  trackSocial(platform: SocialPlatform, location: NavigationLocation): void {
    this.track({
      action: 'social_click',
      category: 'social_media',
      label: `${platform}_${location}`,
      customParams: { platform, location }
    })
  }

  trackDownload(fileName: string, fileType: string): void {
    this.track({
      action: 'file_download',
      category: 'downloads',
      label: fileName,
      customParams: { file_type: fileType }
    })
  }

  trackSearch(searchTerm: string, resultsCount: number): void {
    this.track({
      action: 'search',
      category: 'search',
      customParams: { search_term: searchTerm, results_count: resultsCount }
    })
  }

  // ========= MÉTODOS AUXILIARES =========
  private canTrack(): boolean {
    return this.isInitialized && typeof window.gtag !== 'undefined'
  }

  private log(message: string, data?: any): void {
    if (this.isDev) {
      console.log(message, data || '')
    }
  }
}

// ========= SINGLETON INSTANCE =========
export const analytics = new Analytics()
