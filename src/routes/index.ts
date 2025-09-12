import { MainLayout } from '@shared'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'
import { RouteConfig, RouteGroup } from '@/core'

import { Raglan } from '@/pages/Projects/Raglan'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Creepy } from '@/pages/Projects/Creepy'
import { SemNome } from '@/pages/Projects/SemNome'
import { Killer } from '@/pages/Projects/Killers'
import { Fantasy } from '@/pages/Projects/Fantasy'
import { Arac } from '@/pages/Projects/Arac'
import { FacesOfHorror } from '@/pages/Projects/FacesOfHorror'

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
        path: '/ladybugs',
        element: Joaninho
      },
      {
        path: '/creepy',
        element: Creepy
      },
      {
        path: '/horror-art',
        element: SemNome
      },
      {
        path: '/halloween',
        element: Killer
      },
      {
        path: '/fantasy',
        element: Fantasy
      },
      {
        path: '/arachnophobia',
        element: Arac
      }
    ]
  }
]
