# CalcTrabalhista 📊

**Sistema completo de calculadoras trabalhistas brasileiras**

Um projeto de estudos desenvolvido para demonstrar a implementação de um sistema moderno de calculadoras trabalhistas, seguindo as melhores práticas de desenvolvimento web e a legislação trabalhista brasileira (CLT).

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como um **estudo de caso** para demonstrar:

- **Desenvolvimento Full-Stack** com Next.js 15
- **Implementação de cálculos complexos** da legislação trabalhista brasileira
- **Arquitetura moderna** com TypeScript e React
- **Monetização digital** através do Google AdSense
- **SEO e Performance** para aplicações web
- **Experiência do usuário** otimizada para dispositivos móveis

### Funcionalidades Principais

✅ **Calculadoras Trabalhistas Completas:**
- 🧾 **Rescisão Trabalhista** - Demissão, acordo mútuo, justa causa
- 🏖️ **Férias** - Férias vencidas, proporcionais e venda de dias
- 💰 **13º Salário** - Cálculo proporcional e parcelado
- 🏦 **FGTS** - Saldo, depósitos e simulação de saques

✅ **Recursos Avançados:**
- 📱 **Responsivo** - Funciona em desktop e mobile
- 📄 **Exportação PDF** - Relatórios profissionais para impressão
- 🔗 **Compartilhamento** - Compartilhe resultados via WhatsApp/redes sociais
- 📊 **Analytics** - Rastreamento detalhado de uso
- 🎯 **AdSense** - Monetização através de anúncios
- 🔍 **SEO Otimizado** - Meta tags, sitemap e structured data
- 📈 **Performance** - Carregamento rápido e otimizado

## 🚀 Tecnologias Utilizadas

### Frontend & Framework
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário  
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Turbopack](https://turbo.build/)** - Bundler ultra-rápido (sucessor do Webpack)

### Estilização & UI
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI modernos
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e não-estilizados
- **[Lucide React](https://lucide.dev/)** - Ícones SVG otimizados

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários performático
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + React Hook Form

### PDF & Documentos
- **[jsPDF](https://github.com/parallax/jsPDF)** - Geração de PDFs no cliente
- **[html2canvas](https://html2canvas.hertzen.com/)** - Captura de elementos HTML para PDF

### Analytics & Monetização
- **[Google Analytics 4](https://analytics.google.com/)** - Análise de tráfego e comportamento
- **[Google AdSense](https://www.google.com/adsense/)** - Monetização através de anúncios
- **[Vercel Analytics](https://vercel.com/analytics)** - Métricas de performance

### SEO & Otimização
- **JSON-LD** - Structured data para motores de busca
- **Sitemap dinâmico** - Indexação automática de páginas
- **Meta tags otimizadas** - Open Graph e Twitter Cards
- **robots.txt** - Controle de crawling

### Desenvolvimento & Build
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[PostCSS](https://postcss.org/)** - Processamento de CSS

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                          # App Router (Next.js 13+)
│   ├── calculadoras/            # Páginas das calculadoras
│   │   ├── rescisao/           # Calculadora de rescisão
│   │   ├── ferias/             # Calculadora de férias  
│   │   ├── decimo-terceiro/    # Calculadora de 13º salário
│   │   └── fgts/               # Calculadora de FGTS
│   ├── privacidade/            # Política de privacidade (LGPD)
│   ├── termos/                 # Termos de uso
│   ├── contato/                # Página de contato
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página inicial
│   └── sitemap.ts              # Sitemap dinâmico
├── components/                  # Componentes React reutilizáveis
│   ├── calculators/            # Componentes das calculadoras
│   │   ├── shared/             # Componentes compartilhados
│   │   ├── rescisao/           # Componentes da rescisão
│   │   ├── ferias/             # Componentes das férias
│   │   ├── decimo-terceiro/    # Componentes do 13º salário
│   │   └── fgts/               # Componentes do FGTS
│   ├── layout/                 # Header, Footer, Navigation
│   ├── sections/               # Seções da página inicial
│   ├── ads/                    # Componentes de anúncios
│   ├── seo/                    # Componentes de SEO
│   └── ui/                     # Componentes base (shadcn/ui)
├── lib/                        # Lógica de negócio e utilitários
│   ├── calculations/           # Cálculos trabalhistas
│   │   ├── rescisao.ts         # Lógica de rescisão
│   │   ├── ferias.ts           # Lógica de férias
│   │   ├── decimo-terceiro.ts  # Lógica do 13º salário
│   │   ├── fgts.ts             # Lógica do FGTS
│   │   ├── constants.ts        # Constantes (tabelas INSS, IRRF)
│   │   └── utils.ts            # Utilitários de cálculo
│   ├── validations/            # Schemas de validação (Zod)
│   ├── analytics/              # Google Analytics
│   ├── config/                 # Configurações do site
│   ├── hooks/                  # React Hooks personalizados
│   └── utils/                  # Utilitários gerais
└── public/                     # Arquivos estáticos
    ├── ads.txt                 # Configuração do AdSense
    ├── robots.txt              # Diretrizes para crawlers
    └── images/                 # Imagens e ícones
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** ou **yarn** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/next-calc-trab.git
cd next-calc-trab
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas chaves:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e configure:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense  
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# URL do Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Slots do AdSense (após aprovação)
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=0987654321
NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=5555555555
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=9999999999

# Email de Contato
CONTACT_EMAIL=seu@email.com

# Ambiente
NODE_ENV=development
```

### 4. Execute o Projeto

#### Desenvolvimento
```bash
npm run dev
# ou  
yarn dev
```

Acesse: **http://localhost:3000**

#### Build de Produção
```bash
npm run build
npm run start
# ou
yarn build  
yarn start
```

#### Linting
```bash
npm run lint
# ou
yarn lint
```

## 📊 Funcionalidades por Calculadora

### 🧾 Rescisão Trabalhista
- **Demissão sem justa causa** - Aviso prévio, multa 40% FGTS
- **Demissão com justa causa** - Apenas saldo de salário
- **Pedido de demissão** - Sem direito a seguro-desemprego
- **Acordo mútuo** - 20% multa FGTS, 80% seguro-desemprego
- **Cálculos inclusos:**
  - Saldo de salário
  - Aviso prévio (trabalhado/indenizado)
  - Férias vencidas e proporcionais + 1/3
  - 13º salário proporcional
  - FGTS + multa rescisória
  - Descontos (INSS, IRRF)

### 🏖️ Férias
- **Férias integrais** (30 dias)
- **Férias proporcionais** (tempo trabalhado)
- **Venda de férias** (até 10 dias)
- **1/3 constitucional** sobre férias e venda
- **Cálculos inclusos:**
  - Valor das férias (dias de direito)
  - Abono pecuniário (venda)
  - 1/3 constitucional
  - Descontos (INSS, IRRF)

### 💰 13º Salário  
- **13º integral** (ano completo)
- **13º proporcional** (meses trabalhados)
- **Primeira parcela** (até 30/11)
- **Segunda parcela** (até 20/12)
- **Cálculos inclusos:**
  - Valor bruto proporcional
  - Adiantamento recebido
  - Descontos (INSS, IRRF)
  - Valor líquido a pagar

### 🏦 FGTS
- **Depósitos mensais** (8% do salário)
- **Saldo acumulado** com rendimentos
- **Simulação de saques:**
  - Demissão sem justa causa (saldo + 40% multa)
  - Acordo mútuo (saldo + 20% multa)  
  - Casa própria (saldo total)
  - Aposentadoria (saldo total)
- **Projeções futuras** de crescimento

## 🎨 Design System

O projeto utiliza um design system baseado em:

- **Cores principais:**
  - Verde Esmeralda (`#059669`) - Call-to-actions
  - Azul (`#3b82f6`) - Links e informações
  - Cinzas neutros - Textos e backgrounds
  
- **Tipografia:**
  - Geist Sans (variável) - Interface
  - Geist Mono - Códigos e números
  
- **Componentes:**
  - Cards com sombras suaves
  - Botões com estados hover/focus
  - Inputs com validação visual
  - Tabelas responsivas

## 📈 Métricas e Analytics

O sistema coleta métricas detalhadas para análise:

- **Uso das calculadoras** - Qual mais utilizada
- **Faixas salariais** - Perfil dos usuários
- **Tempo de cálculo** - Performance UX
- **Downloads PDF** - Engajamento
- **Compartilhamentos** - Viralidade
- **Cliques em anúncios** - Receita AdSense

## 🔒 Privacidade e LGPD

O projeto está em conformidade com a LGPD:

- ✅ **Política de privacidade** completa
- ✅ **Termos de uso** detalhados  
- ✅ **Consentimento** para cookies e analytics
- ✅ **Dados mínimos** - apenas o necessário
- ✅ **Transparência** sobre uso dos dados

## 📱 Responsividade

- **Mobile First** - Desenvolvido pensando no celular
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** - Botões e inputs otimizados para toque
- **PWA-ready** - Pode ser instalado como app

## 🚀 Performance

- **Lighthouse Score 90+** em todas as métricas
- **Core Web Vitals** otimizados
- **Bundle splitting** automático (Next.js)
- **Image optimization** automática
- **Font optimization** com `next/font`

## 🤝 Contribuição

Este é um projeto de estudos, mas contribuições são bem-vindas:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto é licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎓 Aprendizados

Este projeto demonstra conhecimentos em:

- **React/Next.js** avançado com App Router
- **TypeScript** para aplicações robustas
- **Tailwind CSS** para desenvolvimento rápido
- **Arquitetura de componentes** reutilizáveis
- **Validação de formulários** com performance
- **Cálculos complexos** em JavaScript
- **SEO técnico** e estruturação de dados
- **Analytics e monetização** digital
- **Responsive design** e UX/UI
- **Performance optimization** web

---

**Desenvolvido com ❤️ para demonstrar as melhores práticas de desenvolvimento web moderno.**

Para dúvidas ou sugestões, entre em contato através da [página de contato](http://localhost:3000/contato).
