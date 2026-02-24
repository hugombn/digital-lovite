/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isto permite carregar imagens de qualquer lugar (útil para o Supabase)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Garante que o Vercel não tenta criar páginas estáticas onde não deve
  output: 'standalone',
};

module.exports = nextConfig;