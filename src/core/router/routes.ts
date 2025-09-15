import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage
} from '@pages'
import { RouteConfig } from '@core/router'
import { Raglan } from '@/pages/Projects/Raglan'
import { Joaninho } from '@/pages/Projects/Joaninho'
import { Creepy } from '@/pages/Projects/Creepy'
import { SemNome } from '@/pages/Projects/SemNome'
import { Killer } from '@/pages/Projects/Killers'
import { Fantasy } from '@/pages/Projects/Fantasy'
import { Arac } from '@/pages/Projects/Arac'
import { FacesOfHorror } from '@/pages/Projects/FacesOfHorror'

export const appRoutes: RouteConfig[] = [
  {
    path: '/',
    element: HomePage,
    title: 'Seu Nome - Portfolio'
  },
  {
    path: '/about',
    element: AboutPage,
    title: 'Sobre - Seu Nome'
  },
  {
    path: '/projects',
    element: ProjectsPage,
    title: 'Projetos - Seu Nome'
  },
  {
    path: '/contact',
    element: ContactPage,
    title: 'Contato - Seu Nome'
  },
  {
    path: '/prints',
    element: PrintsPage,
    title: 'Prints - Seu Nome'
  },
  {
    path: '/facesofhorror',
    element: FacesOfHorror,
    title: 'Faces of Horror - Seu Nome'
  },
  {
    path: '/tshirt-raglan',
    element: Raglan,
    title: 'T-Shirt Raglan - Seu Nome'
  },
  {
    path: '/ladybugs',
    element: Joaninho,
    title: 'Ladybugs - Seu Nome'
  },
  {
    path: '/creepy',
    element: Creepy,
    title: 'Creepy - Seu Nome'
  },
  {
    path: '/horror-art',
    element: SemNome,
    title: 'Horror Art - Seu Nome'
  },
  {
    path: '/halloween',
    element: Killer,
    title: 'Halloween - Seu Nome'
  },
  {
    path: '/fantasy',
    element: Fantasy,
    title: 'Fantasy - Seu Nome'
  },
  {
    path: '/arachnophobia',
    element: Arac,
    title: 'Arachnophobia - Seu Nome'
  }
]
