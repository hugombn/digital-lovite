# 📸 Digital Lovite

> A experiência da câmera descartável na web. Capture momentos agora, revele-os amanhã.

![Project Status](https://img.shields.io/badge/status-development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

**Digital Lovite** é uma aplicação web que recria a nostalgia das câmeras descartáveis. Os utilizadores criam "rolos" de eventos, partilham o link com amigos, tiram fotos, mas **só conseguem ver o resultado no dia seguinte às 09:00**.

## 🛠 Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Storage:** [Supabase](https://supabase.com/)
* **Deploy:** [Vercel](https://vercel.com/)

---

## 📂 Estrutura do Projeto

A organização de pastas segue uma arquitetura modular focada no Next.js App Router:

```bash
digital-lovite/
├── public/              # Assets estáticos (ícones, sons, manifesto PWA)
├── src/
│   ├── app/             # Rotas e Layouts (App Router)
│   │   ├── layout.tsx   # Layout global (Providers, Navbar)
│   │   ├── page.tsx     # Landing page (Criar novo rolo)
│   │   └── rolo/
│   │       └── [id]/    # Rota dinâmica do rolo (ex: /rolo/festa-joao)
│   │           └── page.tsx
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── Camera/      # Lógica de acesso à câmera e upload
│   │   ├── Gallery/     # Grid de fotos (lógica de revelação/bloqueio)
│   │   └── UI/          # Elementos visuais (Botões, Cards, Loaders)
│   ├── lib/             # Configurações de infraestrutura
│   │   ├── supabase.ts  # Cliente de conexão ao Supabase
│   │   └── utils.ts     # Utilitários (cálculo de datas de revelação)
│   ├── hooks/           # Custom Hooks (ex: useCamera)
│   └── types/           # Definições de Tipos (TypeScript Interfaces)
├── supabase/            # Configurações locais do banco (migrations)
├── .env.local           # Variáveis de Ambiente (NÃO COMITAR)
└── tailwind.config.ts   # Configuração do design system

```

# supabase pasword
digital-LOVITE123456789