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
import { Raglan } from '@/pages/Projects/Raglan'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Creepy } from '@/pages/Projects/Creepy'
import { SemNome } from '@/pages/Projects/SemNome'
import { Killer } from '@/pages/Projects/Killers'

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
        path: '/facesofhorror',
        element: FacesOfHorror
      },
      {
        path: '/tshirt-raglan',
        element: Raglan
      },
      {
        path: '/joaninho',
        element: Joaninho
      },
      {
        path: '/creepy',
        element: Creepy
      },
      {
        path: '/semnome',
        element: SemNome
      },
      {
        path: '/killers',
        element: Killer
      }
    ]
  }
]
