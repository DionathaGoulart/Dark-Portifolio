import { Translation } from '@/types'

export const ptTranslations: Translation = {
  nav: {
    home: 'Início',
    about: 'Sobre',
    projects: 'Projetos',
    contact: 'Contato',
    prints: 'Prints'
  },
  pages: {
    home: {
      title: 'Início'
    },
    about: {
      title: 'Sobre',
      description:
        'Dark é uma ilustradora brasileira autodidata, especializada em horror com fortes influências do mangá. Seu trabalho é conhecido pelo domínio da técnica em preto e branco, criando imagens impactantes, densas e visualmente inquietantes.',
      content:
        'Oferece ilustrações digitais exclusivas e personalizadas voltadas para o mercado de moda alternativa, desenvolvendo estampas marcantes para produtos como camisetas, adesivos colecionáveis, tote bags e acessórios.'
    },
    projects: {
      title: 'Projetos',
      description:
        'Explore alguns dos nossos trabalhos mais recentes. Cada imagem representa um projeto único e inspirador.'
    },
    contact: {
      title: 'Contato',
      subtitle: 'Para comissões, consultas ou colaborações, entre em contato!',
      form: {
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar Mensagem',
        sending: 'Enviando...',
        namePlaceholder: 'Seu nome',
        emailPlaceholder: 'seu@email.com',
        messagePlaceholder: 'Sua mensagem...',
        successTitle: 'Mensagem enviada com sucesso!',
        successMessage: 'Obrigado pelo contato. Responderemos em breve.',
        sendAnother: 'Enviar outra mensagem',
        errorMessage: 'Erro ao enviar mensagem. Tente novamente.'
      }
    },
    prints: {
      title: 'Prints & Artwork',
      subtitle: 'Coleção de arte e impressões exclusivas.'
    }
  },
  footer: {
    rights: '© 2025 Todos os direitos reservados.',
    language: 'Idioma'
  },
  common: {
    loading: 'Carregando...',
    error: 'Erro ao carregar',
    noImages: 'Nenhuma imagem encontrada'
  }
}
