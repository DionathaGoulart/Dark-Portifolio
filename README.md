# 🎨 Dark Portfolio

> **Um portfólio moderno e elegante construído com as mais recentes tecnologias web**

[![CI/CD](https://github.com/seu-usuario/dark-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/dark-portfolio/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/seu-usuario/dark-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/seu-usuario/dark-portfolio)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 📸 Preview

<!-- Adicione suas screenshots aqui -->
<div align="center">
  <img src="screenshots/home-desktop.png" alt="Home Desktop" width="800"/>
  <p><em>Página inicial - Versão Desktop</em></p>
</div>

<div align="center">
  <img src="screenshots/home-mobile.png" alt="Home Mobile" width="400"/>
  <p><em>Página inicial - Versão Mobile</em></p>
</div>

## ✨ Funcionalidades

### 🎯 **Principais Características**

- **🌙 Dark/Light Mode** - Alternância automática entre temas
- **📱 Totalmente Responsivo** - Funciona perfeitamente em todos os dispositivos
- **⚡ Performance Otimizada** - Carregamento rápido com lazy loading
- **🖼️ Galeria Interativa** - Visualização de projetos com zoom e navegação
- **🌍 Internacionalização** - Suporte a múltiplos idiomas (PT/EN)
- **♿ Acessibilidade** - Seguindo padrões WCAG 2.1
- **🔍 SEO Otimizado** - Meta tags e estrutura otimizada para buscadores

### 🛠️ **Funcionalidades Técnicas**

- **🧪 Testes Completos** - Cobertura de 70%+ com Jest e React Testing Library
- **🚀 CI/CD Automatizado** - Deploy automático via GitHub Actions
- **📊 Analytics Integrado** - Google Analytics para métricas
- **🖼️ Otimização de Imagens** - Compressão automática e formatos modernos
- **📱 PWA Ready** - Preparado para Progressive Web App
- **🔒 TypeScript** - Tipagem estática para maior segurança

## 🏗️ Arquitetura do Projeto

```
src/
├── 📁 assets/              # Imagens, ícones e assets estáticos
│   ├── logo.webp
│   └── react.svg
├── 📁 core/                # Configurações principais
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Ponto de entrada
│   ├── providers/         # Context providers (Theme, I18n)
│   └── routing/           # Configuração de rotas
├── 📁 features/            # Funcionalidades específicas
│   ├── analytics/         # Google Analytics
│   └── gallery/           # Sistema de galeria
├── 📁 pages/              # Páginas da aplicação
│   ├── Home.tsx           # Página inicial
│   ├── About.tsx          # Sobre mim
│   ├── Projects.tsx       # Projetos
│   ├── Prints.tsx         # Impressões
│   ├── Contact.tsx        # Contato
│   └── Projetos/          # Páginas específicas de projetos
├── 📁 shared/             # Componentes e utilitários compartilhados
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # Contextos React
│   ├── utils/            # Funções utilitárias
│   └── translations/     # Arquivos de tradução
├── 📁 styles/             # Estilos globais
├── 📁 test/               # Testes organizados
└── 📁 types/              # Definições TypeScript
```

## 📄 Páginas e Seções

### 🏠 **Home**
- **Hero Section** - Apresentação principal com call-to-action
- **Sobre Mim** - Resumo profissional e habilidades
- **Projetos em Destaque** - Grid responsivo com projetos principais
- **Skills** - Tecnologias e ferramentas dominadas
- **Estatísticas** - Números e conquistas importantes

<!-- Adicione screenshot da Home -->
<div align="center">
  <img src="screenshots/home-hero.png" alt="Home Hero Section" width="800"/>
  <p><em>Seção Hero - Apresentação principal</em></p>
</div>

### 👨‍💻 **About**
- **História Pessoal** - Jornada e experiência profissional
- **Educação** - Formação acadêmica e certificações
- **Habilidades Técnicas** - Stack tecnológico e competências
- **Soft Skills** - Competências comportamentais
- **Currículo** - Download do CV em PDF

<!-- Adicione screenshot do About -->
<div align="center">
  <img src="screenshots/about-page.png" alt="About Page" width="800"/>
  <p><em>Página Sobre - Informações detalhadas</em></p>
</div>

### 🚀 **Projects**
- **Filtros** - Categorização por tecnologia e tipo
- **Grid Responsivo** - Layout adaptativo para diferentes telas
- **Modal de Detalhes** - Informações completas de cada projeto
- **Links Externos** - GitHub, demo, e documentação
- **Tecnologias** - Stack usado em cada projeto

<!-- Adicione screenshot dos Projetos -->
<div align="center">
  <img src="screenshots/projects-grid.png" alt="Projects Grid" width="800"/>
  <p><em>Grid de Projetos - Visualização organizada</em></p>
</div>

### 🖼️ **Prints**
- **Galeria de Arte** - Coleção de trabalhos visuais
- **Categorias** - Organização por estilo e tema
- **Zoom Interativo** - Visualização detalhada das obras
- **Informações** - Técnicas e inspirações

<!-- Adicione screenshot das Impressões -->
<div align="center">
  <img src="screenshots/prints-gallery.png" alt="Prints Gallery" width="800"/>
  <p><em>Galeria de Impressões - Trabalhos visuais</em></p>
</div>

### 📞 **Contact**
- **Formulário de Contato** - Integração com EmailJS
- **Informações de Contato** - Email, telefone, redes sociais
- **Mapa Interativo** - Localização (opcional)
- **Redes Sociais** - Links para perfis profissionais

<!-- Adicione screenshot do Contato -->
<div align="center">
  <img src="screenshots/contact-form.png" alt="Contact Form" width="800"/>
  <p><em>Formulário de Contato - Comunicação direta</em></p>
</div>

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento client-side
- **Framer Motion** - Animações fluidas (opcional)

### **Ferramentas de Desenvolvimento**
- **Vitest** - Test runner moderno e rápido
- **Cypress** - Testes E2E interativos
- **React Testing Library** - Testes de componentes
- **MSW** - Mock Service Worker para APIs
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código

### **Deploy e CI/CD**
- **GitHub Actions** - Automação de CI/CD com múltiplos workflows
- **Vercel** - Deploy automático (integração nativa)
- **Codecov** - Relatórios de cobertura de testes
- **Preview Deploys** - Deploy automático em PRs
- **Test Automation** - Testes unitários e E2E automatizados

### **Integrações**
- **Google Analytics** - Métricas e analytics
- **EmailJS** - Envio de emails via formulário
- **Lucide React** - Ícones modernos
- **@fontsource/inter** - Fontes Inter otimizadas

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 20 ou superior
- npm ou yarn
- Git

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/dark-portfolio.git

# Entre no diretório
cd dark-portfolio

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Executar ESLint

# Testes Unitários e Integração (Vitest)
npm test             # Executar todos os testes
npm run test:watch   # Modo watch para testes
npm run test:run     # Executar testes uma vez
npm run test:ui      # Interface visual dos testes
npm run test:coverage # Testes com cobertura
npm run test:summary # Testes com resumo

# Testes E2E (Cypress)
npm run cypress:open # Abrir Cypress interativo
npm run cypress:run  # Executar testes E2E
```

## 🧪 Testes

O projeto possui uma suíte completa de testes com cobertura de **70%+**:

### **Tipos de Testes**

- **Testes Unitários** - Providers, Layouts e Componentes individuais
- **Testes de Integração** - Páginas, fluxos e APIs
- **Testes E2E** - Navegação, formulários e interações completas
- **Acessibilidade** - Testes de acessibilidade e responsividade

### **Ferramentas de Teste**

- **Vitest** - Test runner moderno e rápido para testes unitários
- **React Testing Library** - Testes focados no comportamento do usuário
- **Cypress** - Testes E2E interativos e confiáveis
- **MSW** - Mock Service Worker para simular APIs
- **JSDOM** - Ambiente de teste para DOM

### **Executar Testes**

```bash
# Testes Unitários e Integração (Vitest)
npm test                 # Executar todos os testes
npm run test:watch       # Modo watch (desenvolvimento)
npm run test:run         # Executar uma vez
npm run test:ui          # Interface visual
npm run test:coverage    # Com relatório de cobertura

# Testes E2E (Cypress)
npm run cypress:open     # Interface interativa
npm run cypress:run      # Executar em modo headless
```

## 🚀 Deploy

### **Deploy Automático (Vercel)**

O projeto está configurado para deploy automático na Vercel:

- **Produção**: Deploy automático na branch `main`
- **Preview**: Deploy automático em Pull Requests
- **URL**: `https://dark-portfolio.vercel.app`

### **Configuração Vercel**

- **Framework**: Vite
- **Node.js**: 20.x
- **Regiões**: IAD1, SFO1
- **Cache**: npm e node_modules habilitados
- **Headers**: Segurança e cache otimizados
- **Redirects**: `/home` → `/` (permanente)

### **Configuração Automática**

1. Conecte seu repositório no [Vercel Dashboard](https://vercel.com)
2. Configure as variáveis de ambiente necessárias
3. O deploy acontece automaticamente via GitHub Actions

### **Workflows GitHub Actions**

O projeto possui workflows automatizados:

- **CI/CD** (`ci.yml`) - Build, testes e deploy automático
- **Tests** (`test.yml`) - Testes unitários e E2E com cobertura
- **Vercel Native** (`vercel-native.yml`) - Deploy nativo do Vercel

### **Deploy Manual**

```bash
# Build para produção
npm run build

# Deploy via Vercel CLI
npx vercel --prod
```

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🔧 Configuração

### **Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# EmailJS
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### **Variáveis para CI/CD**

Configure no GitHub Secrets para os workflows:

```env
# EmailJS (para testes E2E)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### **Personalização**

- **Cores**: Edite `tailwind.config.js`
- **Fontes**: Configure em `src/styles/global.css`
- **Conteúdo**: Modifique os arquivos em `src/shared/translations/`
- **Imagens**: Adicione suas imagens em `src/assets/`

## 📱 Responsividade

O portfólio é totalmente responsivo e otimizado para:

- **📱 Mobile** (320px - 768px)
- **📱 Tablet** (768px - 1024px)
- **💻 Desktop** (1024px - 1440px)
- **🖥️ Large Desktop** (1440px+)

## ♿ Acessibilidade

- **Navegação por teclado** - Totalmente acessível via teclado
- **Screen readers** - Compatível com leitores de tela
- **Contraste** - Cores com contraste adequado
- **Foco visível** - Indicadores de foco claros
- **Alt text** - Textos alternativos para imagens

## 🌍 Internacionalização

Suporte completo a múltiplos idiomas:

- **🇧🇷 Português** - Idioma padrão
- **🇺🇸 English** - Tradução completa
- **🔄 Troca dinâmica** - Sem recarregar a página
- **📝 Fácil adição** - Novos idiomas facilmente adicionáveis

## 📈 Analytics

Integração completa com Google Analytics:

- **Page views** - Visualizações de páginas
- **User interactions** - Cliques e interações
- **Performance** - Métricas de performance
- **Custom events** - Eventos personalizados

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões são bem-vindas!

### **Como Contribuir**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Padrões de Código**

- Use TypeScript para tipagem estática
- Siga as convenções do ESLint configuradas
- Escreva testes unitários com Vitest
- Escreva testes E2E com Cypress para fluxos críticos
- Mantenha a cobertura de testes acima de 70%
- Use MSW para mock de APIs nos testes
- Siga os padrões do React Testing Library

## 📄 Licença

**⚠️ ATENÇÃO: Este projeto é de uso exclusivo e pessoal.**

### **Direitos Reservados**

Este software e sua documentação são propriedade exclusiva do autor e estão protegidos por direitos autorais. É **expressamente proibido**:

- ❌ **Copiar** o código fonte
- ❌ **Modificar** sem autorização
- ❌ **Distribuir** o software
- ❌ **Usar** para fins comerciais
- ❌ **Criar trabalhos derivados**
- ❌ **Fazer engenharia reversa**

### **Uso Permitido**

- ✅ **Visualizar** o código para fins educacionais
- ✅ **Estudar** a implementação para aprendizado
- ✅ **Inspirar-se** nas ideias e conceitos
- ✅ **Fazer fork** apenas para estudo pessoal

### **Consequências**

A violação desta licença resultará em:
- Ação legal imediata
- Remoção do conteúdo infrator
- Danos e prejuízos conforme a lei

**© 2024 [Seu Nome]. Todos os direitos reservados.**

## 📞 Contato

**Desenvolvedor**: [Seu Nome]  
**Email**: [seu-email@exemplo.com]  
**LinkedIn**: [linkedin.com/in/seu-perfil]  
**GitHub**: [github.com/seu-usuario]  
**Portfolio**: [seu-portfolio.com]

---

<div align="center">
  <p>Feito com ❤️ e muito ☕ por [Seu Nome]</p>
  <p>⭐ Se este projeto te inspirou, considere dar uma estrela!</p>
</div>
