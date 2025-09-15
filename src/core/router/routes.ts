import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'
import { RouteConfig } from '@core/router'
import { Macabre } from '@/pages/Projects/Macabre'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Creepy } from '@/pages/Projects/Creepy'
import { Horror } from '@/pages/Projects/Horror'
import { Halloween } from '@/pages/Projects/Halloween'
import { Fantasy } from '@/pages/Projects/Fantasy'
import { Arac } from '@/pages/Projects/Arac'
import { FacesOfHorror } from '@/pages/Projects/FacesOfHorror'

export const appRoutes: RouteConfig[] = [
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
    element: Macabre
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
    element: Horror
  },
  {
    path: '/halloween',
    element: Halloween
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
