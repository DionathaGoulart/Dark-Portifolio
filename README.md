<div align="center">

# 🎨 Dark Portfolio

**Portfolio profissional moderno com design minimalista e performance otimizada**

[![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-blue?style=flat-square&logo=github)](https://github.com/DionathaGoulart/Dark-Portifolio/actions)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📸 Preview

<div align="center">

<img src="public/screenshots/desktop.jpeg" alt="Desktop Preview" width="800"/>
<p><em>Visualização desktop com layout responsivo e tema escuro</em></p>

<img src="public/screenshots/mobile.jpeg" alt="Mobile Preview" width="400"/>
<p><em>Interface mobile otimizada com navegação intuitiva</em></p>

</div>

---

## ✨ Funcionalidades

### 🎯 Principais Características

- **🎨 Design Minimalista** - Interface limpa e moderna focada no conteúdo
- **🌙 Tema Escuro/Claro** - Alternância suave entre temas com persistência
- **📱 Totalmente Responsivo** - Otimizado para todos os dispositivos
- **⚡ Performance Otimizada** - Carregamento rápido com lazy loading
- **🖼️ Galeria de Imagens** - Masonry grid com zoom modal
- **📧 Formulário de Contato** - Integração com EmailJS para envio de mensagens
- **🌍 Internacionalização** - Suporte a Português e Inglês
- **📊 Analytics Integrado** - Tracking de eventos com Google Analytics

### 🛠️ Funcionalidades Técnicas

- **⚡ Vite + React 19** - Build tool moderno com React mais recente
- **🔷 TypeScript Strict** - Tipagem forte para maior confiabilidade
- **🎨 Tailwind CSS** - Estilização utilitária e responsiva
- **🔄 React Router v7** - Navegação SPA com roteamento avançado
- **📦 Code Splitting** - Carregamento otimizado de componentes
- **🖼️ Otimização de Imagens** - Cloudinary para transformações dinâmicas

---

## 🏗️ Arquitetura do Projeto

```
src/
├── 📁 assets/              # Recursos estáticos (imagens, ícones)
│   ├── index.ts
│   └── logo.webp
├── 📁 core/                # Configuração principal da aplicação
│   ├── App.tsx
│   ├── main.tsx
│   └── providers/          # Provedores de contexto
├── 📁 features/            # Funcionalidades específicas
│   ├── analytics/          # Google Analytics
│   └── gallery/            # Galeria de imagens
├── 📁 pages/               # Páginas da aplicação
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Projects.tsx
│   ├── Prints.tsx
│   └── Projetos/           # Páginas de projetos específicos
├── 📁 shared/              # Componentes e utilitários compartilhados
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Contextos React
│   ├── hooks/              # Custom hooks
│   ├── translations/       # Arquivos de tradução
│   └── utils/              # Funções utilitárias
├── 📁 styles/              # Estilos globais
└── 📁 types/               # Definições de tipos TypeScript
```

---

## 📄 Páginas e Seções

### 🏠 Home

- **Galeria Principal** - Masonry grid com imagens otimizadas
- **Carregamento Progressivo** - Lazy loading para melhor performance
- **Modal de Zoom** - Visualização ampliada das imagens
- **Animações Suaves** - Transições e efeitos hover

### 📖 About

- **Informações Pessoais** - Descrição profissional e biografia
- **Design Responsivo** - Layout adaptável para todos os dispositivos
- **Tipografia Otimizada** - Hierarquia visual clara

### 📧 Contact

- **Formulário Funcional** - Integração com EmailJS
- **Validação em Tempo Real** - Feedback imediato ao usuário
- **Estados de Loading** - Indicadores visuais durante envio
- **Mensagens de Sucesso/Erro** - Confirmação de ações

### 🚀 Projects

- **Grid de Projetos** - Visualização organizada dos trabalhos
- **Navegação Intuitiva** - Links para páginas específicas
- **Carregamento Otimizado** - Performance aprimorada

### 🖼️ Prints

- **Links Externos** - Integração com plataformas de arte
- **Tracking de Cliques** - Analytics para métricas de engajamento
- **Design Consistente** - Mantém identidade visual

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript 5.9.2** - Superset tipado do JavaScript
- **Vite 7.1.7** - Build tool e dev server moderno
- **Tailwind CSS 3.4.0** - Framework CSS utilitário

### Bibliotecas e Dependências

- **React Router DOM 7.9.3** - Roteamento para aplicações React
- **Lucide React 0.544.0** - Ícones SVG otimizados
- **EmailJS 4.4.1** - Serviço de envio de emails
- **Google Analytics** - Tracking e analytics

### Ferramentas de Desenvolvimento

- **ESLint 9.36.0** - Linter para qualidade de código
- **Prettier 3.5.3** - Formatador de código
- **TypeScript ESLint 8.45.0** - Regras ESLint para TypeScript
- **PostCSS 8.4.35** - Processador CSS

### Deploy e CI/CD

- **Vercel** - Plataforma de deploy e hospedagem
- **GitHub Actions** - Automação de CI/CD
- **Cloudinary** - CDN e otimização de imagens

### Integrações

- **Google Analytics 4** - Analytics e métricas
- **EmailJS** - Serviço de envio de emails
- **Cloudinary** - Transformação e otimização de imagens

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/DionathaGoulart/Dark-Portifolio.git

# Entre no diretório
cd Dark-Portifolio

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run preview      # Preview da build de produção

# Build e Deploy
npm run build        # Build para produção
npm run lint         # Executa linter ESLint
```

---

## 🧪 CI/CD e Qualidade

### GitHub Actions

O projeto possui workflow automatizado de CI/CD:

- **Build Automático** - Compilação e testes em cada push
- **Deploy Automático** - Deploy na branch develop
- **Lighthouse CI** - Análise de performance automatizada
- **Linting** - Verificação de qualidade de código

### Ferramentas de Qualidade

- **ESLint** - Análise estática de código JavaScript/TypeScript
- **Prettier** - Formatação consistente de código
- **TypeScript** - Verificação de tipos em tempo de compilação
- **Lighthouse** - Auditoria de performance e acessibilidade

---

## 🚀 Deploy

### Deploy Automático (Vercel)

O projeto está configurado para deploy automático na Vercel:

- **Produção**: Deploy automático na branch `main`
- **Preview**: Deploy automático em Pull Requests e branch `develop`
- **URL**: `https://dionatha.com.br`

### Configuração Vercel

- **Framework**: Vite
- **Runtime**: Node.js 18
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

### Configuração Automática

1. Conecte seu repositório no Vercel Dashboard
2. Configure as variáveis de ambiente necessárias
3. O deploy acontece automaticamente via GitHub Actions

### Workflows GitHub Actions

O projeto possui workflow automatizado:

- **CI/CD** (`ci.yml`) - Build, testes, linting e deploy automático

### Deploy Manual

```bash
# Build para produção
npm run build

# Deploy via Vercel CLI
vercel --prod
```

---

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics
VITE_GA_MEASUREMENT_ID=your_measurement_id
```

### Personalização

- **Cores**: Edite `tailwind.config.js`
- **Fontes**: Configure em `tailwind.config.js`
- **Imagens**: Adicione seus arquivos em `public/`
- **Traduções**: Modifique os arquivos em `src/shared/translations/`
- **Analytics**: Configure em `src/features/analytics/`

---

## 📱 Responsividade

O portfolio é totalmente responsivo e otimizado para:

- **📱 Mobile** (320px - 768px)
- **📱 Tablet** (768px - 1024px)
- **💻 Desktop** (1024px - 1440px)
- **🖥️ Large Desktop** (1440px+)

---

## ♿ Acessibilidade

- **Navegação por Teclado** - Suporte completo a navegação via teclado
- **Screen Readers** - Compatível com leitores de tela
- **Contraste Adequado** - Cores com contraste WCAG AA
- **Alt Text** - Textos alternativos para todas as imagens
- **ARIA Labels** - Rótulos apropriados para elementos interativos

---

## 🌍 Internacionalização

Suporte completo a múltiplos idiomas:

- **🇧🇷 Português** - Idioma padrão
- **🇺🇸 English** - Tradução completa
- **Context API** - Gerenciamento de estado de idioma
- **Persistência** - Preferência salva no localStorage

---

## 📈 Analytics

Integração completa com Google Analytics 4:

- **Page Views** - Tracking de visualizações de página
- **User Interactions** - Cliques em imagens e links
- **Form Submissions** - Métricas de formulário de contato
- **Performance Metrics** - Core Web Vitals

---

## 📄 Licença

**⚠️ ATENÇÃO: Este projeto é de uso exclusivo e pessoal.**

### Direitos Reservados

Este software e sua documentação são propriedade exclusiva do autor e estão protegidos por direitos autorais. É **expressamente proibido**:

- ❌ **Copiar** o código fonte
- ❌ **Modificar** sem autorização
- ❌ **Distribuir** o software
- ❌ **Usar** para fins comerciais
- ❌ **Criar trabalhos derivados**
- ❌ **Fazer engenharia reversa**

### Uso Permitido

- ✅ **Visualizar** o código para fins educacionais
- ✅ **Estudar** a implementação para aprendizado
- ✅ **Inspirar-se** nas ideias e conceitos
- ✅ **Fazer fork** apenas para estudo pessoal

### Consequências

A violação desta licença resultará em:

- Ação legal imediata
- Remoção do conteúdo infrator
- Danos e prejuízos conforme a lei

**© 2025 Dionatha Goulart. Todos os direitos reservados.**

---

## 📞 Contato

**Desenvolvedor**: Dionatha Goulart  
**Email**: dionatha.work@gmail.com  
**Portfolio**: https://dionatha.com.br/  
**GitHub**: https://github.com/DionathaGoulart  
**Linkedin**: https://www.linkedin.com/in/dionathagoulart/

---

<div align="center">

**Feito by Dionatha Goulart**

</div>
