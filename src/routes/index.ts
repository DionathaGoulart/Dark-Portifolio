import { MainLayout } from '@shared'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'
import { RouteConfig, RouteGroup } from '@/core'

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
      }
    ]
  }
]
