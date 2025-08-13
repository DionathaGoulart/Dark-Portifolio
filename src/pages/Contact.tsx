import React, { useEffect, useState } from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { trackContactAction } from '@/features/trafego'

export const ContactPage: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('contact')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    trackContactAction('contact_page_view')
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Pega as variáveis de ambiente
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Validação das variáveis de ambiente
      if (!serviceId || !templateId || !publicKey) {
        console.error('Variáveis de ambiente não configuradas:', {
          serviceId: !!serviceId,
          templateId: !!templateId,
          publicKey: !!publicKey
        })
        throw new Error('Configuração do EmailJS não encontrada')
      }

      // Usando EmailJS para enviar o email
      const response = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              to_email: 'darkning.arts@gmail.com'
            }
          })
        }
      )

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        trackContactAction('form_submit')
      } else {
        const errorData = await response.text()
        console.error('Erro da API:', response.status, errorData)
        throw new Error(
          `Falha ao enviar email: ${response.status} - ${errorData}`
        )
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para rastrear clique no email
  const handleEmailClick = () => {
    trackContactAction('email_click')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
          {t.pages.contact.title}
        </h1>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {/* Informações de contato */}
          <div className="border-l-2 border-primary-black dark:border-primary-white pl-6">
            <h2 className="text-2xl font-semibold text-primary-black dark:text-primary-white mb-6">
              {t.pages.contact.info.title}
            </h2>
            <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed mb-8">
              {t.pages.contact.info.description}
            </p>

            {/* Lista de contatos */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-black dark:bg-primary-white"></div>
                <span className="text-primary-black dark:text-primary-white font-medium">
                  darkning.arts@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="border border-primary-black dark:border-primary-white p-8">
            <h3 className="text-xl font-medium text-primary-black dark:text-primary-white mb-6">
              {t.pages.contact.form.send}
            </h3>

            {/* Mensagem de sucesso - substitui o formulário */}
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium text-primary-black dark:text-primary-white mb-2">
                    {t.pages.contact.form.successTitle ||
                      'Message sent successfully!'}
                  </h4>
                  <p className="text-primary-black/60 dark:text-primary-white/60 mb-6">
                    {t.pages.contact.form.successMessage ||
                      'Thank you for contacting us. We will respond soon.'}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="inline-flex items-center px-4 py-2 border border-primary-black dark:border-primary-white bg-transparent text-primary-black dark:text-primary-white text-sm font-medium hover:bg-primary-black hover:text-primary-white dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-300"
                  >
                    {t.pages.contact.form.sendAnother || 'Send another message'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Status de erro */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 border border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
                    {t.pages.contact.form.errorMessage ||
                      'Error sending message. Please try again.'}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                      {t.pages.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-black dark:border-primary-white bg-transparent text-primary-black dark:text-primary-white placeholder-primary-black/40 dark:placeholder-primary-white/40 focus:outline-none focus:ring-2 focus:ring-primary-black dark:focus:ring-primary-white focus:ring-offset-2 focus:ring-offset-primary-white dark:focus:ring-offset-primary-black transition-all duration-300"
                      placeholder={t.pages.contact.form.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                      {t.pages.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-black dark:border-primary-white bg-transparent text-primary-black dark:text-primary-white placeholder-primary-black/40 dark:placeholder-primary-white/40 focus:outline-none focus:ring-2 focus:ring-primary-black dark:focus:ring-primary-white focus:ring-offset-2 focus:ring-offset-primary-white dark:focus:ring-offset-primary-black transition-all duration-300"
                      placeholder={t.pages.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                      {t.pages.contact.form.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-primary-black dark:border-primary-white bg-transparent text-primary-black dark:text-primary-white placeholder-primary-black/40 dark:placeholder-primary-white/40 focus:outline-none focus:ring-2 focus:ring-primary-black dark:focus:ring-primary-white focus:ring-offset-2 focus:ring-offset-primary-white dark:focus:ring-offset-primary-black transition-all duration-300 resize-none"
                      placeholder={t.pages.contact.form.messagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 border-2 border-primary-black dark:border-primary-white bg-transparent text-primary-black dark:text-primary-white font-medium hover:bg-primary-black hover:text-primary-white dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-black dark:focus:ring-primary-white focus:ring-offset-2 focus:ring-offset-primary-white dark:focus:ring-offset-primary-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? t.pages.contact.form.sending || 'Sending...'
                      : t.pages.contact.form.send}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Elemento decorativo minimalista */}
        <div className="mt-16 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto"></div>
      </div>
    </div>
  )
}
