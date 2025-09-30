import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactPage } from '@/pages/Contact'
import { mockFormData, mockTranslations } from '../../utils/mock-data'

// Mock the shared modules
vi.mock('@/shared', () => ({
  useDocumentTitle: vi.fn(),
  useI18n: vi.fn(() => ({
    t: mockTranslations
  }))
}))

vi.mock('@/features/analytics', () => ({
  trackEvent: vi.fn()
}))

// Mock fetch for EmailJS API
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_EMAILJS_SERVICE_ID: 'test-service-id',
    VITE_EMAILJS_TEMPLATE_ID: 'test-template-id',
    VITE_EMAILJS_PUBLIC_KEY: 'test-public-key'
  },
  writable: true
})

describe('ContactPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockReset()
  })

  afterEach(() => {
    mockFetch.mockReset()
  })

  it('should render contact form with all fields', () => {
    render(<ContactPage />)

    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<ContactPage />)

    expect(screen.getByText('Get in touch with us')).toBeInTheDocument()
    expect(screen.getByText('darkning.arts@gmail.com')).toBeInTheDocument()
  })

  it('should update form fields when user types', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const nameInput = screen.getByPlaceholderText('Your name')
    const emailInput = screen.getByPlaceholderText('your@email.com')
    const messageInput = screen.getByPlaceholderText('Your message')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Test message')
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)

    expect(screen.getByPlaceholderText('Your name')).toBeRequired()
    expect(screen.getByPlaceholderText('your@email.com')).toBeRequired()
    expect(screen.getByPlaceholderText('Your message')).toBeRequired()
  })

  it('should have correct email link', () => {
    render(<ContactPage />)

    const emailLink = screen.getByText('darkning.arts@gmail.com')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:darkning.arts@gmail.com')
  })

  it('should apply custom className when provided', () => {
    const { container } = render(<ContactPage className="custom-contact-class" />)

    expect(container.firstChild).toHaveClass('custom-contact-class')
  })
})
