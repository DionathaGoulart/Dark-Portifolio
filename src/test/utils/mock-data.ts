import { ImageItem } from '@/types'

export const mockImageItem: ImageItem = {
  id: 'test-image-1',
  title: 'Test Image',
  url: 'https://res.cloudinary.com/test/image/upload/test.jpg',
  urls: {
    original: 'https://res.cloudinary.com/test/image/upload/test.jpg',
    thumbnail: 'https://res.cloudinary.com/test/image/upload/w_150,h_150,c_fill/test.jpg',
    hero: 'https://res.cloudinary.com/test/image/upload/w_1920,h_1080,c_fill/test.jpg'
  },
  width: 1920,
  height: 1080,
  alt: 'Test image description'
}

export const mockImageItems: ImageItem[] = Array.from({ length: 8 }, (_, index) => ({
  ...mockImageItem,
  id: `test-image-${index + 1}`,
  title: `Test Image ${index + 1}`
}))

export const mockFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'This is a test message'
}

export const mockTranslations = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    prints: 'Prints'
  },
  pages: {
    contact: {
      title: 'Contact',
      info: {
        description: 'Get in touch with us'
      },
      form: {
        send: 'Send',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Your message',
        sending: 'Sending...',
        successTitle: 'Message sent successfully!',
        successMessage: 'Thank you for contacting us. We will respond soon.',
        sendAnother: 'Send another message',
        errorMessage: 'Error sending message. Please try again.'
      }
    }
  },
  footer: {
    rights: 'All rights reserved'
  },
  common: {
    noImages: 'No images found',
    error: 'Error loading images'
  }
}
