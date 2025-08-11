import { Translation } from '@/types'

export const enTranslations: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    prints: 'Prints'
  },
  pageTitles: {
    home: 'Home - Dark',
    about: 'About - Dark',
    projects: 'Projects - Dark',
    contact: 'Contact - Dark',
    prints: 'Prints & Artwork - Dark'
  },
  pages: {
    home: {
      title: 'Welcome Home',
      subtitle: 'This is the homepage of your minimalist project.'
    },
    about: {
      title: 'About',
      description:
        'Dark is a self-taught Brazilian illustrator, specialized in horror with strong influences from manga. Her work is known for its mastery of black-and-white technique, creating impactful, dense, and visually unsettling imagery. She has a special affinity for dark, feminine characters, exploring eerie beauty with a touch of strangeness and melancholy.',
      content:
        'She offers exclusive, custom digital illustrations aimed at the alternative fashion market, creating striking designs for products such as t-shirts, collectible stickers, tote bags, and accessories.'
    },
    projects: {
      title: 'Our Projects',
      description:
        'Explore some of our most recent work. Each image represents a unique and inspiring project.'
    },
    contact: {
      title: 'Contact',
      subtitle:
        'For commissions, inquiries, or collaborations, feel free to reach out through the contact below or send a message using the form!',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Your message...',
        successTitle: 'Message sent successfully!',
        successMessage: 'Thank you for contacting us. We will respond soon.',
        sendAnother: 'Send another message',
        errorMessage: 'Error sending message. Please try again.'
      },
      info: {
        title: 'Get in touch',
        description:
          'For commissions, inquiries, or collaborations, feel free to reach out through the contact below or send a message using the form!'
      }
    },
    prints: {
      title: 'Prints & Artwork',
      subtitle: 'Collection of exclusive art and prints.'
    }
  },
  footer: {
    rights: '© 2025 All rights reserved.',
    language: 'Language'
  },
  common: {
    loading: 'Loading...',
    error: 'Error loading',
    noImages: 'No images found'
  }
}
