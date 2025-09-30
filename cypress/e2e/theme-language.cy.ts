describe('Theme and Language Switching E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should switch between light and dark themes', () => {
    // Check initial theme (should be dark by default)
    cy.get('html').should('have.class', 'dark')

    // Switch to light theme
    cy.switchTheme()
    cy.get('html').should('not.have.class', 'dark')

    // Switch back to dark theme
    cy.switchTheme()
    cy.get('html').should('have.class', 'dark')
  })

  it('should persist theme preference in localStorage', () => {
    // Switch to light theme
    cy.switchTheme()
    cy.get('html').should('not.have.class', 'dark')

    // Reload page
    cy.reload()

    // Theme should persist
    cy.get('html').should('not.have.class', 'dark')

    // Check localStorage
    cy.window().its('localStorage.theme').should('eq', 'light')
  })

  it('should switch between Portuguese and English', () => {
    // Check initial language (should be Portuguese by default)
    cy.contains('Início').should('be.visible')

    // Switch to English
    cy.switchLanguage()
    cy.contains('Home').should('be.visible')
    cy.contains('Início').should('not.exist')

    // Switch back to Portuguese
    cy.switchLanguage()
    cy.contains('Início').should('be.visible')
    cy.contains('Home').should('not.exist')
  })

  it('should persist language preference in localStorage', () => {
    // Switch to English
    cy.switchLanguage()
    cy.contains('Home').should('be.visible')

    // Reload page
    cy.reload()

    // Language should persist
    cy.contains('Home').should('be.visible')

    // Check localStorage
    cy.window().its('localStorage.app-language').should('eq', 'en')
  })

  it('should update page content when language changes', () => {
    // Navigate to About page
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')

    // Switch to English
    cy.switchLanguage()
    cy.contains('About').should('be.visible')

    // Switch back to Portuguese
    cy.switchLanguage()
    cy.contains('Sobre').should('be.visible')
  })

  it('should update contact form when language changes', () => {
    // Navigate to Contact page
    cy.get('a[href="/contact"]').click()
    cy.url().should('include', '/contact')

    // Switch to English
    cy.switchLanguage()
    cy.contains('Contact').should('be.visible')
    cy.contains('Name').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('Message').should('be.visible')

    // Switch back to Portuguese
    cy.switchLanguage()
    cy.contains('Contato').should('be.visible')
    cy.contains('Nome').should('be.visible')
    cy.contains('E-mail').should('be.visible')
    cy.contains('Mensagem').should('be.visible')
  })

  it('should maintain theme and language settings across page navigation', () => {
    // Set theme to light
    cy.switchTheme()
    cy.get('html').should('not.have.class', 'dark')

    // Set language to English
    cy.switchLanguage()
    cy.contains('Home').should('be.visible')

    // Navigate to different pages
    cy.get('a[href="/about"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.contains('About').should('be.visible')

    cy.get('a[href="/projects"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.contains('Projects').should('be.visible')

    cy.get('a[href="/contact"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.contains('Contact').should('be.visible')
  })

  it('should have accessible theme toggle button', () => {
    cy.get('[data-testid="theme-toggle"]')
      .should('be.visible')
      .and('have.attr', 'aria-label')
      .and('not.be.disabled')
  })

  it('should have accessible language switch button', () => {
    cy.get('[data-testid="language-switch"]')
      .should('be.visible')
      .and('have.attr', 'aria-label')
      .and('not.be.disabled')
  })
})
