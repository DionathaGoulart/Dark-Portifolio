import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock EmailJS API
  http.post('https://api.emailjs.com/api/v1.0/email/send', () => {
    return HttpResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  }),

  // Mock Google Analytics
  http.post('https://www.google-analytics.com/g/collect', () => {
    return HttpResponse.json({}, { status: 200 })
  }),

  // Mock Cloudinary API (if needed)
  http.get('https://res.cloudinary.com/*', () => {
    return HttpResponse.json({}, { status: 200 })
  })
]
