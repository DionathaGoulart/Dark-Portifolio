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
        'Dark é uma ilustradora brasileira autodidata, especializada em horror com fortes influências do mangá. Seu trabalho é conhecido pela maestria da técnica preto-e-branco, criando imagens impactantes, densas e visualmente perturbadoras.',
      content:
        'Ela oferece ilustrações digitais exclusivas e personalizadas voltadas para o mercado de moda alternativa, criando designs marcantes para produtos como camisetas, adesivos colecionáveis, ecobags e acessórios.'
    },
    projects: {
      title: 'Projetos',
      description:
        'Explore alguns dos nossos trabalhos mais recentes. Cada imagem representa um projeto único e inspirador.'
    },
    contact: {
      title: 'Contato',
      subtitle:
        'Para encomendas, dúvidas ou colaborações, sinta-se à vontade para entrar em contato!',
      info: {
        // ← ADICIONADO
        title: 'Informações de Contato',
        description:
          'Entre em contato conosco para qualquer dúvida, colaboração ou projetos personalizados. Adoraríamos ouvir de você!'
      },
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
        successMessage:
          'Obrigado por entrar em contato. Responderemos em breve.',
        sendAnother: 'Enviar outra mensagem',
        errorMessage: 'Erro ao enviar mensagem. Tente novamente.'
      }
    },
    prints: {
      title: 'Prints & Arte',
      subtitle: 'Coleção de arte exclusiva e prints.'
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
