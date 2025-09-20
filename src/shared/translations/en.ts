// ================================
// Internal Imports
// ================================
import { Translation } from '@/types'

// ================================
// English Translations
// ================================

/**
 * English language translations for the application
 * Contains all text content organized by feature and context
 */
export const enTranslations: Translation = {
  // ================================
  // Navigation Labels
  // ================================
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    prints: 'Prints'
  },

  // ================================
  // Page Content
  // ================================
  pages: {
    // Home page content
    home: {
      title: 'Home'
    },

    // About page content
    about: {
      title: 'About',
      description:
        'Dark is a self-taught Brazilian illustrator, specialized in horror with strong influences from manga. Her work is known for its mastery of black-and-white technique, creating impactful, dense, and visually unsettling imagery.',
      content:
        'She offers exclusive, custom digital illustrations aimed at the alternative fashion market, creating striking designs for products such as t-shirts, collectible stickers, tote bags, and accessories.'
    },

    // Projects page content
    projects: {
      title: 'Projects',
      description:
        'Explore some of our most recent work. Each image represents a unique and inspiring project.'
    },

    // Contact page content
    contact: {
      title: 'Contact',
      subtitle:
        'For commissions, inquiries, or collaborations, feel free to reach out!',

      // Contact information section
      info: {
        title: 'Contact Information',
        description:
          "Get in touch with us for any inquiries, collaborations, or custom projects. We'd love to hear from you!"
      },

      // Contact form labels and messages
      form: {
        // Form field labels
        name: 'Name',
        email: 'Email',
        message: 'Message',

        // Form actions
        send: 'Send Message',
        sending: 'Sending...',
        sendAnother: 'Send another message',

        // Placeholders
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Your message...',

        // Success messages
        successTitle: 'Message sent successfully!',
        successMessage: 'Thank you for contacting us. We will respond soon.',

        // Error messages
        errorMessage: 'Error sending message. Please try again.'
      }
    },

    // Prints page content
    prints: {
      title: 'Prints & Artwork',
      subtitle: 'Collection of exclusive art and prints.',
      links: {
        redbubble: 'Clothing, stickers and more (Redbubble)',
        colab55: 'Buy my art in Brazil (Colab55)',
        inprnt: 'Prints (INPRNT)',
        displate: 'My exclusive posters on Displate 🤍',
        portfolio: 'Portfolio',
        donate: 'Donate (づ⁠ ᴗ _ᴗ)づ⁠☕'
      }
    }
  },

  // ================================
  // Footer Content
  // ================================
  footer: {
    rights: '© 2025 All rights reserved.',
    language: 'Language'
  },

  // ================================
  // Common UI Text
  // ================================
  common: {
    loading: 'Loading...',
    error: 'Error loading',
    noImages: 'No images found'
  }
}
