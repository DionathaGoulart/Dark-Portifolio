describe('Gallery E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display gallery with images on home page', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Check that images are displayed
    cy.get('[data-testid*="image-"]').should('have.length.greaterThan', 0)
  })

  it('should open image modal when clicking on an image', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Click on first image
    cy.get('[data-testid*="image-"]').first().click()

    // Modal should open
    cy.get('[data-testid="modal-zoom"]').should('be.visible')
    cy.get('[data-testid="modal-image"]').should('be.visible')
  })

  it('should close image modal when clicking close button', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Click on first image to open modal
    cy.get('[data-testid*="image-"]').first().click()
    cy.get('[data-testid="modal-zoom"]').should('be.visible')

    // Click close button
    cy.get('[data-testid="modal-close"]').click()

    // Modal should close
    cy.get('[data-testid="modal-zoom"]').should('not.exist')
  })

  it('should close image modal when pressing Escape key', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Click on first image to open modal
    cy.get('[data-testid*="image-"]').first().click()
    cy.get('[data-testid="modal-zoom"]').should('be.visible')

    // Press Escape key
    cy.get('body').type('{esc}')

    // Modal should close
    cy.get('[data-testid="modal-zoom"]').should('not.exist')
  })

  it('should display projects page with 8 images', () => {
    cy.visit('/projects')

    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Check that we have 8 images
    cy.get('[data-testid*="project-image-"]').should('have.length', 8)
  })

  it('should open project image modal when clicking on project image', () => {
    cy.visit('/projects')

    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Click on first project image
    cy.get('[data-testid*="project-image-"]').first().click()

    // Modal should open
    cy.get('[data-testid="modal-zoom"]').should('be.visible')
    cy.get('[data-testid="modal-image"]').should('be.visible')
  })

  it('should show loading state while images are loading', () => {
    cy.visit('/')

    // Loading state should be visible initially
    cy.get('[data-testid="masonry-grid-loader"]').should('be.visible')

    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Loading state should be gone
    cy.get('[data-testid="masonry-grid-loader"]').should('not.exist')
  })

  it('should handle image loading errors gracefully', () => {
    // Mock image loading failure
    cy.intercept('GET', 'https://res.cloudinary.com/**', {
      statusCode: 404,
      body: 'Not Found'
    }).as('imageError')

    cy.visit('/')

    // Should show error state
    cy.contains('Erro ao carregar imagens', { timeout: 10000 }).should('be.visible')
  })

  it('should be responsive on mobile devices', () => {
    cy.viewport(375, 667) // iPhone SE

    // Gallery should be visible and responsive
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Images should be clickable on mobile
    cy.get('[data-testid*="image-"]').first().click()
    cy.get('[data-testid="modal-zoom"]').should('be.visible')
  })

  it('should be responsive on tablet devices', () => {
    cy.viewport(768, 1024) // iPad

    // Gallery should be visible and responsive
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Images should be clickable on tablet
    cy.get('[data-testid*="image-"]').first().click()
    cy.get('[data-testid="modal-zoom"]').should('be.visible')
  })

  it('should have accessible image elements', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Images should have alt text
    cy.get('[data-testid*="image-"] img').should('have.attr', 'alt')

    // Images should be keyboard accessible
    cy.get('[data-testid*="image-"]').first().focus().should('be.focused')
  })

  it('should track analytics events for image interactions', () => {
    // Wait for images to load
    cy.get('[data-testid="masonry-grid"]', { timeout: 10000 }).should('be.visible')

    // Click on an image
    cy.get('[data-testid*="image-"]').first().click()

    // Wait for analytics call
    cy.wait('@analytics')
  })
})
