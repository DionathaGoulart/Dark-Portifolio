describe('Contact Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display contact form with all required fields', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="name"]').should('be.visible').and('be.required')
    cy.get('input[name="email"]').should('be.visible').and('be.required')
    cy.get('textarea[name="message"]').should('be.visible').and('be.required')
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Send')
  })

  it('should fill and submit contact form successfully', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message for the contact form.'
    }

    // Fill form
    cy.fillContactForm(formData)

    // Submit form
    cy.get('button[type="submit"]').click()

    // Wait for success message
    cy.contains('Message sent successfully!', { timeout: 10000 }).should('be.visible')
    cy.contains('Thank you for contacting us. We will respond soon.').should('be.visible')

    // Verify API call was made
    cy.wait('@sendEmail').then((interception) => {
      expect(interception.request.body).to.include('John Doe')
      expect(interception.request.body).to.include('john@example.com')
      expect(interception.request.body).to.include('This is a test message')
    })
  })

  it('should show loading state during form submission', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    }

    // Fill form
    cy.fillContactForm(formData)

    // Submit form
    cy.get('button[type="submit"]').click()

    // Check loading state
    cy.get('button[type="submit"]').should('contain', 'Sending...').and('be.disabled')
  })

  it('should reset form after successful submission', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    }

    // Fill and submit form
    cy.fillContactForm(formData)
    cy.get('button[type="submit"]').click()

    // Wait for success message
    cy.contains('Message sent successfully!', { timeout: 10000 }).should('be.visible')

    // Click "Send another message" button
    cy.contains('Send another message').click()

    // Form should be reset
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('input[name="email"]').should('have.value', '')
    cy.get('textarea[name="message"]').should('have.value', '')
  })

  it('should show error message when form submission fails', () => {
    // Mock API failure
    cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('sendEmailError')

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    }

    // Fill and submit form
    cy.fillContactForm(formData)
    cy.get('button[type="submit"]').click()

    // Wait for error message
    cy.contains('Error sending message. Please try again.', { timeout: 10000 }).should('be.visible')
  })

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click()

    // Form should not submit and fields should show validation
    cy.get('input[name="name"]').should('have.attr', 'required')
    cy.get('input[name="email"]').should('have.attr', 'required')
    cy.get('textarea[name="message"]').should('have.attr', 'required')
  })

  it('should validate email format', () => {
    // Fill form with invalid email
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('textarea[name="message"]').type('Test message')

    // Try to submit
    cy.get('button[type="submit"]').click()

    // Email field should show validation error
    cy.get('input[name="email"]').should('have.attr', 'type', 'email')
  })

  it('should display contact information', () => {
    cy.contains('Get in touch with us').should('be.visible')
    cy.contains('darkning.arts@gmail.com').should('be.visible')

    // Email link should be clickable
    cy.get('a[href="mailto:darkning.arts@gmail.com"]')
      .should('be.visible')
      .and('have.attr', 'target', '_blank')
  })

  it('should be accessible with keyboard navigation', () => {
    // Tab through form fields
    cy.get('input[name="name"]').focus().should('be.focused')
    cy.get('input[name="email"]').tab().should('be.focused')
    cy.get('textarea[name="message"]').tab().should('be.focused')
    cy.get('button[type="submit"]').tab().should('be.focused')
  })

  it('should work on mobile devices', () => {
    cy.viewport(375, 667) // iPhone SE

    // Form should be visible and functional
    cy.get('form').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('textarea[name="message"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')

    // Test form submission on mobile
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Mobile test message'
    })

    cy.get('button[type="submit"]').click()
    cy.contains('Message sent successfully!', { timeout: 10000 }).should('be.visible')
  })
})
