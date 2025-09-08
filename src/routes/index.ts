import { MainLayout } from '@shared'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'
import { RouteConfig, RouteGroup } from '@/core'
import ImageGridShowcase from '@/pages/ShowCase'
import ProjectOne from '@/pages/ProjectOne'
import ProjectTwo from '@/pages/ProjectTwo'

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
        element: ImageGridShowcase
      },
      {
        path: '/projectone',
        element: ProjectOne
      },
      {
        path: '/projecttwo',
        element: ProjectTwo
      }
    ]
  }
]
