describe('Stores E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/stores')
  })

  it('should display stores page with all store links', () => {
    cy.contains('Prints & Stores').should('be.visible')
    cy.contains('Find my artwork available for purchase.').should('be.visible')

    // Check that all store links are present
    cy.get('a[href*="redbubble.com"]').should('be.visible')
    cy.get('a[href*="society6.com"]').should('be.visible')
    cy.get('a[href*="etsy.com"]').should('be.visible')
  })

  it('should have working store links with correct URLs', () => {
    // Test Redbubble link
    cy.get('a[href*="redbubble.com"]')
      .should('have.attr', 'href')
      .and('include', 'redbubble.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')

    // Test Society6 link
    cy.get('a[href*="society6.com"]')
      .should('have.attr', 'href')
      .and('include', 'society6.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')

    // Test Etsy link
    cy.get('a[href*="etsy.com"]')
      .should('have.attr', 'href')
      .and('include', 'etsy.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should display store descriptions', () => {
    cy.contains('High-quality prints and merchandise').should('be.visible')
    cy.contains('Art prints and home decor').should('be.visible')
    cy.contains('Handmade and vintage items').should('be.visible')
  })

  it('should have accessible store cards', () => {
    // Store cards should be keyboard accessible
    cy.get('a[href*="redbubble.com"]').focus().should('be.focused')
    cy.get('a[href*="society6.com"]').focus().should('be.focused')
    cy.get('a[href*="etsy.com"]').focus().should('be.focused')
  })

  it('should be responsive on mobile devices', () => {
    cy.viewport(375, 667) // iPhone SE

    // All store links should be visible and clickable
    cy.get('a[href*="redbubble.com"]').should('be.visible')
    cy.get('a[href*="society6.com"]').should('be.visible')
    cy.get('a[href*="etsy.com"]').should('be.visible')

    // Store descriptions should be readable
    cy.contains('High-quality prints and merchandise').should('be.visible')
    cy.contains('Art prints and home decor').should('be.visible')
    cy.contains('Handmade and vintage items').should('be.visible')
  })

  it('should be responsive on tablet devices', () => {
    cy.viewport(768, 1024) // iPad

    // All store links should be visible and clickable
    cy.get('a[href*="redbubble.com"]').should('be.visible')
    cy.get('a[href*="society6.com"]').should('be.visible')
    cy.get('a[href*="etsy.com"]').should('be.visible')

    // Layout should be properly structured
    cy.get('h1').should('contain', 'Prints & Stores')
    cy.get('p').should('contain', 'Find my artwork available for purchase.')
  })

  it('should have proper heading structure', () => {
    cy.get('h1').should('contain', 'Prints & Stores')
    cy.get('h2').should('have.length.greaterThan', 0) // Store names should be h2
  })

  it('should maintain consistent styling across themes', () => {
    // Test in dark theme (default)
    cy.get('body').should('have.class', 'dark')
    cy.get('a[href*="redbubble.com"]').should('be.visible')

    // Switch to light theme
    cy.switchTheme()
    cy.get('body').should('not.have.class', 'dark')
    cy.get('a[href*="redbubble.com"]').should('be.visible')

    // Switch back to dark theme
    cy.switchTheme()
    cy.get('body').should('have.class', 'dark')
    cy.get('a[href*="redbubble.com"]').should('be.visible')
  })

  it('should work with different languages', () => {
    // Test in Portuguese (default)
    cy.contains('Prints & Stores').should('be.visible')

    // Switch to English
    cy.switchLanguage()
    cy.contains('Prints & Stores').should('be.visible')

    // Switch back to Portuguese
    cy.switchLanguage()
    cy.contains('Prints & Stores').should('be.visible')
  })

  it('should have proper focus indicators', () => {
    // Tab through store links
    cy.get('a[href*="redbubble.com"]').focus().should('be.focused')
    cy.get('a[href*="society6.com"]').tab().should('be.focused')
    cy.get('a[href*="etsy.com"]').tab().should('be.focused')
  })

  it('should load quickly and efficiently', () => {
    // Page should load within reasonable time
    cy.get('h1', { timeout: 5000 }).should('be.visible')
    cy.get('a[href*="redbubble.com"]', { timeout: 5000 }).should('be.visible')
  })
})
