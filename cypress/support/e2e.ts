// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Mock external services
beforeEach(() => {
  // Mock EmailJS
  cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
    statusCode: 200,
    body: { message: 'Email sent successfully' }
  }).as('sendEmail')

  // Mock Google Analytics
  cy.intercept('POST', 'https://www.google-analytics.com/g/collect', {
    statusCode: 200
  }).as('analytics')

  // Mock Cloudinary images
  cy.intercept('GET', 'https://res.cloudinary.com/**', {
    statusCode: 200,
    fixture: 'test-image.jpg'
  }).as('cloudinaryImage')
})
