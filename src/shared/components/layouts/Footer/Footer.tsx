import React from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'
import { BaseStyledProps } from '@/shared/types/Layout.types'

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Rodapé da aplicação com informações de copyright
 * Exibe texto de direitos traduzido com design responsivo
 */
export const LayoutFooter: React.FC<BaseStyledProps> = ({ className = '' }) => {
  const { t } = useI18n()

  // ================================
  // VALORES COMPUTADOS
  // ================================

  const footerClasses = [
    'bg-primary-white dark:bg-primary-black transition-all duration-300',
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDERIZAÇÃO
  // ================================

  return (
    <footer className={footerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center text-primary-black dark:text-primary-white">
            <p className="font-medium tracking-wide">{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
