import { MainLayout } from '@shared'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage,
  FacesOfHorror
} from '@pages'
import { RouteConfig, RouteGroup } from '@/core'
import ShowcasePage from '@/pages/ShowCase'
import ProjectOne from '@/pages/ProjectOne'
import { CamisetasRaglan } from '@/pages/Projects/CamisetasRaglan'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Creepy } from '@/pages/Projects/Creepy'

export const appRoutes: (RouteConfig | RouteGroup)[] = [
  {
    layout: MainLayout,
    routes: [
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
      {
        path: '/project1',
        element: ShowcasePage
      },
      {
        path: '/projectone',
        element: ProjectOne
      },
      {
        path: '/facesofhorror',
        element: FacesOfHorror
      },
      {
        path: '/tshirt-raglan',
        element: CamisetasRaglan
      },
      {
        path: '/joaninho',
        element: Joaninho
      },
      {
        path: '/creepy',
        element: Creepy
      }
    ]
  }
]
