import { analytics } from './analytics'
import {
  ContactAction,
  NavigationLocation,
  SocialPlatform
} from '../types/analytics'

// ========= FUNÇÕES DE CONVENIÊNCIA =========
// Para manter compatibilidade com código existente

export const initGoogleAnalytics = () => analytics.init()

export const trackProjectClick = (id: string, name?: string) =>
  analytics.trackProject(id, name)

export const trackNavigationClick = (
  page: string,
  location: NavigationLocation
) => analytics.trackNavigation(page, location)

export const trackContactAction = (action: ContactAction) =>
  analytics.trackContact(action)

export const trackSocialClick = (
  platform: SocialPlatform,
  location: NavigationLocation
) => analytics.trackSocial(platform, location)

export const trackDownload = (fileName: string, fileType: string) =>
  analytics.trackDownload(fileName, fileType)

export const trackSearch = (searchTerm: string, resultsCount: number) =>
  analytics.trackSearch(searchTerm, resultsCount)

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParams?: Record<string, any>
) => {
  analytics.track({ action, category, label, value, customParams })
}
