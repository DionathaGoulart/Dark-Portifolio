// ================================
// CONTACT FORM TYPES
// ================================

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string
  email: string
  message: string
}

/**
 * Contact form validation errors
 */
export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
  general?: string
}

/**
 * Contact form submission state
 */
export interface ContactFormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errors: ContactFormErrors
}

/**
 * Contact form props
 */
export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  className?: string
}

/**
 * Contact page props
 */
export interface ContactPageProps {
  className?: string
}
