export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-yellow-400">
      <h1 className="text-4xl font-black italic tracking-tighter mb-4">DIGITAL LOVITE</h1>
      <p className="mb-8 font-mono text-sm uppercase">Cria o teu rolo e partilha o link</p>
      <a 
        href={`/rolo/${Math.random().toString(36).substring(7)}`}
        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
      >
        CRIAR NOVO ROLO
      </a>
    </main>
  );
}