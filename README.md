# digital-lovite

digital-lovite/
├── public/              # Ícones, manifestos PWA e sons (clique da câmera)
├── src/
│   ├── app/             # Rotas e Layouts (App Router)
│   │   ├── layout.tsx   # Layout global (Providers, Navbar)
│   │   ├── page.tsx     # Landing page (Criar novo rolo)
│   │   └── rolo/
│   │       └── [id]/    # Rota dinâmica do rolo de fotos
│   │           └── page.tsx
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Camera/      # Lógica da câmera e captura
│   │   ├── Gallery/     # Grid de fotos (reveladas e ocultas)
│   │   └── UI/          # Botões, cards e loaders (Shadcn/UI recomendável)
│   ├── lib/             # Configurações de terceiros
│   │   ├── supabase.ts  # Cliente do Supabase
│   │   └── utils.ts     # Funções utilitárias (cálculo de datas)
│   ├── hooks/           # Custom hooks (ex: useCamera)
│   └── types/           # Definições de TypeScript (Foto, Rolo)
├── supabase/            # Configurações do banco (opcional para migrations)
├── .env.local           # Variáveis de ambiente (SUPABASE_URL, etc)
└── tailwind.config.ts   # Estilização visual (estilo vintage/disposable)