import {
  HomePage,
  AboutPage,
  ProjectsPage,
  PrintsPage,
  ContactPage,
  Arac,
  Creepy,
  FacesOfHorror,
  Fantasy,
  Halloween,
  Horror,
  Joaninho,
  Macabre
} from '@pages'
import { RouteConfig } from '@types'

// ================================
// Configuração de Rotas
// ================================

/**
 * Configuração das rotas da aplicação
 * Define todas as rotas disponíveis e seus respectivos componentes de página
 */
export const appRoutes: RouteConfig[] = [
  // Rotas de navegação principal
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
    path: '/stores',
    element: PrintsPage
  },

  // Rotas específicas de projetos (ordenadas alfabeticamente)
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
