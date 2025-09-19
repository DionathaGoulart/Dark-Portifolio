// ================================
// External and Internal Imports
// ================================
import { RouteConfig } from '@core/router'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'

// Project-specific page imports
import { Arac } from '@/pages/Projects/Arac'
import { Creepy } from '@/pages/Projects/Creepy'
import { FacesOfHorror } from '@/pages/Projects/FacesOfHorror'
import { Fantasy } from '@/pages/Projects/Fantasy'
import { Halloween } from '@/pages/Projects/Halloween'
import { Horror } from '@/pages/Projects/Horror'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Macabre } from '@/pages/Projects/Macabre'

// ================================
// Route Configuration
// ================================

/**
 * Application routes configuration
 * Defines all available routes and their corresponding page components
 */
export const appRoutes: RouteConfig[] = [
  // Main navigation routes
  {
    path: '/',
    element: HomePage
  },
  {
    path: '/about',
    element: AboutPage
  },
  {
    path: '/projects',
    element: ProjectsPage
  },
  {
    path: '/contact',
    element: ContactPage
  },
  {
    path: '/prints',
    element: PrintsPage
  },

  // Project-specific routes (alphabetically ordered)
  {
    path: '/arachnophobia',
    element: Arac
  },
  {
    path: '/creepy',
    element: Creepy
  },
  {
    path: '/facesofhorror',
    element: FacesOfHorror
  },
  {
    path: '/fantasy',
    element: Fantasy
  },
  {
    path: '/halloween',
    element: Halloween
  },
  {
    path: '/horror-art',
    element: Horror
  },
  {
    path: '/ladybugs',
    element: Joaninho
  },
  {
    path: '/tshirt-raglan',
    element: Macabre
  }
]
