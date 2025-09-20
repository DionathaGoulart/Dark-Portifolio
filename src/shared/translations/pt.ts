// ================================
// Internal Imports
// ================================
import { Translation } from '@/types'

// ================================
// Portuguese Translations
// ================================

/**
 * Portuguese language translations for the application
 * Contains all text content organized by feature and context
 */
export const ptTranslations: Translation = {
  // ================================
  // Navigation Labels
  // ================================
  nav: {
    home: 'Início',
    about: 'Sobre',
    projects: 'Projetos',
    contact: 'Contato',
    prints: 'Prints'
  },

  // ================================
  // Page Content
  // ================================
  pages: {
    // Home page content
    home: {
      title: 'Início'
    },

    // About page content
    about: {
      title: 'Sobre',
      description:
        'Dark é uma ilustradora brasileira autodidata, especializada em horror com fortes influências do mangá. Seu trabalho é conhecido pela maestria da técnica preto-e-branco, criando imagens impactantes, densas e visualmente perturbadoras.',
      content:
        'Ela oferece ilustrações digitais exclusivas e personalizadas voltadas para o mercado de moda alternativa, criando designs marcantes para produtos como camisetas, adesivos colecionáveis, ecobags e acessórios.'
    },

    // Projects page content
    projects: {
      title: 'Projetos',
      description:
        'Explore alguns dos nossos trabalhos mais recentes. Cada imagem representa um projeto único e inspirador.'
    },

    // Contact page content
    contact: {
      title: 'Contato',
      subtitle:
        'Para encomendas, dúvidas ou colaborações, sinta-se à vontade para entrar em contato!',

      // Contact information section
      info: {
        title: 'Informações de Contato',
        description:
          'Entre em contato conosco para qualquer dúvida, colaboração ou projetos personalizados. Adoraríamos ouvir de você!'
      },

      // Contact form labels and messages
      form: {
        // Form field labels
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',

        // Form actions
        send: 'Enviar Mensagem',
        sending: 'Enviando...',
        sendAnother: 'Enviar outra mensagem',

        // Placeholders
        namePlaceholder: 'Seu nome',
        emailPlaceholder: 'seu@email.com',
        messagePlaceholder: 'Sua mensagem...',

        // Success messages
        successTitle: 'Mensagem enviada com sucesso!',
        successMessage:
          'Obrigado por entrar em contato. Responderemos em breve.',

        // Error messages
        errorMessage: 'Erro ao enviar mensagem. Tente novamente.'
      }
    },

    // Prints page content
    prints: {
      title: 'Prints & Arte',
      subtitle: 'Coleção de arte exclusiva e prints.',
      links: {
        redbubble: 'Roupas, adesivos e mais (Redbubble)',
        colab55: 'Compre minha arte no Brasil (Colab55)',
        inprnt: 'Prints (INPRNT)',
        displate: 'Meus pôsteres exclusivos no Displate 🤍',
        portfolio: 'Portfólio',
        donate: 'Apoie meu trabalho (づ⁠ ᴗ _ᴗ)づ⁠☕'
      }
    }
  },

  // ================================
  // Footer Content
  // ================================
  footer: {
    rights: '© 2025 Todos os direitos reservados.',
    language: 'Idioma'
  },

  // ================================
  // Common UI Text
  // ================================
  common: {
    loading: 'Carregando...',
    error: 'Erro ao carregar',
    noImages: 'Nenhuma imagem encontrada'
  }
}
