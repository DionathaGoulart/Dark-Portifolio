# Guia de Testes - Dark Portfolio

Este projeto inclui uma suíte completa de testes unitários, integração e E2E para garantir a qualidade e funcionalidade da aplicação.

## 🧪 Tipos de Testes

### Testes Unitários
- **Providers**: `ThemeProvider` e `I18nProvider`
- **Layouts**: `Header`, `Footer`, `MainLayout`
- **Componentes**: Testes isolados de componentes individuais

### Testes de Integração
- **Páginas**: Home, About, Contact, Projects, Prints
- **Fluxos**: Navegação entre páginas, formulários, galeria de imagens
- **APIs**: Integração com EmailJS e Google Analytics

### Testes E2E
- **Navegação**: Testes de navegação entre todas as páginas
- **Tema e Idioma**: Alternância de tema e idioma
- **Formulário de Contato**: Preenchimento e envio de formulários
- **Galeria**: Interação com imagens e modais
- **Lojas**: Links para lojas externas

## 🚀 Executando os Testes

### Pré-requisitos
```bash
npm install
```

### Testes Unitários e Integração (Vitest)
```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com UI
npm run test:ui

# Executar testes uma vez
npm run test:run

# Executar testes com cobertura
npm run test:coverage
```

### Testes E2E (Cypress)
```bash
# Abrir Cypress em modo interativo
npm run cypress:open

# Executar testes E2E em modo headless
npm run cypress:run
```

## 📁 Estrutura de Testes

```
src/
├── test/
│   ├── __tests__/
│   │   ├── providers/
│   │   │   ├── ThemeProvider.test.tsx
│   │   │   └── I18nProvider.test.tsx
│   │   ├── layouts/
│   │   │   ├── Header.test.tsx
│   │   │   ├── Footer.test.tsx
│   │   │   └── MainLayout.test.tsx
│   │   └── pages/
│   │       ├── Home.test.tsx
│   │       ├── About.test.tsx
│   │       ├── Contact.test.tsx
│   │       ├── Projects.test.tsx
│   │       └── Prints.test.tsx
│   ├── mocks/
│   │   ├── server.ts
│   │   └── handlers.ts
│   ├── utils/
│   │   ├── test-utils.tsx
│   │   └── mock-data.ts
│   └── setup.ts
cypress/
├── e2e/
│   ├── navigation.cy.ts
│   ├── theme-language.cy.ts
│   ├── contact-form.cy.ts
│   ├── gallery.cy.ts
│   └── stores.cy.ts
├── support/
│   ├── e2e.ts
│   └── commands.ts
└── tsconfig.json
```

## 🔧 Configuração

### Vitest
- Configurado em `vitest.config.ts`
- Usa React Testing Library para renderização
- MSW para mock de APIs
- JSDOM como ambiente de teste

### Cypress
- Configurado em `cypress.config.ts`
- Suporte a TypeScript
- Mocks automáticos para APIs externas
- Comandos customizados para ações comuns

## 📊 Cobertura de Testes

Os testes cobrem:
- ✅ Providers (Theme e I18n)
- ✅ Layouts principais
- ✅ Páginas e componentes
- ✅ Formulários e validação
- ✅ Navegação e roteamento
- ✅ Responsividade
- ✅ Acessibilidade
- ✅ Integração com APIs

## 🛠️ Ferramentas Utilizadas

- **Vitest**: Test runner moderno e rápido
- **React Testing Library**: Testes focados no comportamento do usuário
- **MSW**: Mock Service Worker para APIs
- **Cypress**: Testes E2E interativos
- **TypeScript**: Tipagem estática para testes

## 📝 Escrevendo Novos Testes

### Testes Unitários
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Testes E2E
```typescript
describe('My Feature', () => {
  it('should work end-to-end', () => {
    cy.visit('/my-page')
    cy.get('[data-testid="my-button"]').click()
    cy.contains('Success').should('be.visible')
  })
})
```

## 🐛 Debugging

### Vitest
```bash
# Executar teste específico
npm run test MyComponent.test.tsx

# Executar com debug
npm run test -- --reporter=verbose
```

### Cypress
```bash
# Abrir Cypress para debug
npm run cypress:open

# Executar teste específico
npm run cypress:run -- --spec "cypress/e2e/my-test.cy.ts"
```

## 📈 CI/CD

Os testes são executados automaticamente em:
- Pull Requests
- Push para branch main
- Deploy para produção

Configuração em `.github/workflows/ci.yml`
