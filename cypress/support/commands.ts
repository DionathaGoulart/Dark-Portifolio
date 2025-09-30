/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to switch theme
       * @example cy.switchTheme()
       */
      switchTheme(): Chainable<void>

      /**
       * Custom command to switch language
       * @example cy.switchLanguage()
       */
      switchLanguage(): Chainable<void>

      /**
       * Custom command to fill contact form
       * @example cy.fillContactForm({ name: 'John', email: 'john@test.com', message: 'Hello' })
       */
      fillContactForm(data: { name: string; email: string; message: string }): Chainable<void>
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('switchTheme', () => {
  cy.get('[data-testid="theme-toggle"]').click()
})

Cypress.Commands.add('switchLanguage', () => {
  cy.get('[data-testid="language-switch"]').click()
})

Cypress.Commands.add('fillContactForm', (data) => {
  cy.get('input[name="name"]').type(data.name)
  cy.get('input[name="email"]').type(data.email)
  cy.get('textarea[name="message"]').type(data.message)
})
