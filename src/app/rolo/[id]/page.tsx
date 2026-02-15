'use client';

import { useParams } from 'next/navigation';
import { CameraComponent } from '../../../components/Camera';
import { GalleryComponent } from '../../../components/Gallery';

export default function RoloPage() {
  // Pegamos o ID diretamente do browser
  const params = useParams();
  const id = params?.id as string; // Garante que é texto

  if (!id) return <div className="p-10">A carregar...</div>;

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      {/* Header Estilo Vintage */}
      <header className="p-6 border-b-2 border-stone-200 bg-white sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-black uppercase tracking-tighter text-center">
          📸 DIGITAL LOVITE <span className="text-yellow-500">#{id}</span>
        </h1>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-8">
        {/* Seção da Câmera */}
        <section className="flex justify-center py-4">
          <CameraComponent rollId={id} onUploadComplete={() => {
            console.log("Upload feito!");
            // Aqui poderemos recarregar a página no futuro
          }} />
        </section>

        <hr className="border-stone-300" />

        {/* Seção da Galeria */}
        <section>
          <h2 className="text-sm font-bold uppercase mb-4 text-stone-500 tracking-widest">
            Rolo de Revelação
          </h2>
          <GalleryComponent rollId={id} />
        </section>
      </div>
    </main>
  );
}