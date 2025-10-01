import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Polyfill for webidl-conversions
if (typeof globalThis.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  globalThis.TextEncoder = TextEncoder
  globalThis.TextDecoder = TextDecoder
}

// Polyfill for URL and URLSearchParams
if (typeof globalThis.URL === 'undefined') {
  const { URL, URLSearchParams } = require('url')
  globalThis.URL = URL
  globalThis.URLSearchParams = URLSearchParams
}

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset any request handlers that we may add during the tests
afterEach(() => {
  server.resetHandlers()
  cleanup()

  // Clear DOM completely
  document.body.innerHTML = ''
  document.head.innerHTML = ''

  // Clear localStorage and sessionStorage
  localStorage.clear()
  sessionStorage.clear()
})

// Clean up after the tests are finished
afterAll(async () => {
  await server.close()
})

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_EMAILJS_SERVICE_ID: 'test_service_id',
    VITE_EMAILJS_TEMPLATE_ID: 'test_template_id',
    VITE_EMAILJS_PUBLIC_KEY: 'test_public_key'
  }
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Suppress React Router warnings in tests
const originalConsoleWarn = console.warn
console.warn = (message, ...args) => {
  if (
    typeof message === 'string' &&
    (message.includes('React Router Future Flag Warning') ||
     message.includes('v7_startTransition') ||
     message.includes('v7_relativeSplatPath'))
  ) {
    return
  }
  originalConsoleWarn(message, ...args)
}

// Suppress console.error for expected test errors
const originalConsoleError = console.error
console.error = (message, ...args) => {
  if (
    typeof message === 'string' &&
    (message.includes('Error loading project covers') ||
     message.includes('Error sending email'))
  ) {
    return
  }
  originalConsoleError(message, ...args)
}

