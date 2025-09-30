describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to all pages from header navigation', () => {
    // Test Home navigation
    cy.get('a[href="/"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('h1', 'Home').should('be.visible')

    // Test About navigation
    cy.get('a[href="/about"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/about')
    cy.contains('h1', 'About').should('be.visible')

    // Test Projects navigation
    cy.get('a[href="/projects"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/projects')
    cy.contains('h1', 'Projects').should('be.visible')

    // Test Contact navigation
    cy.get('a[href="/contact"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/contact')
    cy.contains('h1', 'Contact').should('be.visible')

    // Test Prints navigation
    cy.get('a[href="/stores"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/stores')
    cy.contains('h1', 'Prints').should('be.visible')
  })

  it('should navigate to all pages from footer navigation', () => {
    // Scroll to footer
    cy.scrollTo('bottom')

    // Test footer navigation links
    cy.get('footer a[href="/"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    cy.get('footer a[href="/about"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/about')

    cy.get('footer a[href="/projects"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/projects')

    cy.get('footer a[href="/contact"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/contact')

    cy.get('footer a[href="/stores"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/stores')
  })

  it('should maintain navigation state across page changes', () => {
    // Navigate to different pages and verify header is still present
    cy.get('a[href="/about"]').click()
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')

    cy.get('a[href="/projects"]').click()
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')

    cy.get('a[href="/contact"]').click()
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('should have working social media links', () => {
    // Test Instagram link
    cy.get('a[aria-label="Instagram"]')
      .should('have.attr', 'href')
      .and('include', 'instagram.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')

    // Test YouTube link
    cy.get('a[aria-label="YouTube"]')
      .should('have.attr', 'href')
      .and('include', 'youtube.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should be responsive on mobile devices', () => {
    cy.viewport(375, 667) // iPhone SE

    // Check that mobile navigation is visible
    cy.get('header').should('be.visible')

    // Check that navigation items are accessible
    cy.get('a[href="/about"]').should('be.visible')
    cy.get('a[href="/projects"]').should('be.visible')
    cy.get('a[href="/contact"]').should('be.visible')
    cy.get('a[href="/stores"]').should('be.visible')
  })

  it('should be responsive on tablet devices', () => {
    cy.viewport(768, 1024) // iPad

    // Check that navigation is properly displayed
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')

    // Check that all navigation items are visible
    cy.get('a[href="/"]').should('be.visible')
    cy.get('a[href="/about"]').should('be.visible')
    cy.get('a[href="/projects"]').should('be.visible')
    cy.get('a[href="/contact"]').should('be.visible')
    cy.get('a[href="/stores"]').should('be.visible')
  })
})
