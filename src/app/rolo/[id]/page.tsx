'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CameraComponent } from '../../../components/Camera';
import { GalleryComponent } from '../../../components/Gallery';

export default function RoloPage() {
  const params = useParams();
  const idRaw = params?.id as string;
  const title = idRaw ? idRaw.replace(/-/g, ' ').toUpperCase() : '...';

  // --- LÓGICA DO RELÓGIO ---
  const [timeLeft, setTimeLeft] = useState("A calcular...");
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(9, 0, 0, 0); // Alvo: 09:00
      if (now > target) target.setDate(target.getDate() + 1); // Se já passou, é amanhã
      
      const diff = target.getTime() - now.getTime();
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${h} h ${m} min ${s} s`);
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  // Função chamada quando o upload termina com sucesso
  const handleUploadSuccess = () => {
    // Dá refresh à página para a galeria ir buscar a nova foto bloqueada
    window.location.reload();
  };

  return (
    <main>
      {/* Fundo Floral */}
      <img src="/bg-floral.jpg" alt="fundo" className="bg-floral" />

      {/* Cabeçalho */}
      <header className="header-container">
        <img src="/logo.png" alt="Lovite" className="logo-img" />
        <h1 className="title">ROLO DE CÂMERA {title} 🎞️</h1>
      </header>

      {/* Barra de Tempo e Botão da Câmera */}
      <div className="info-bar">
        {/* Relógio */}
        <span style={{ minWidth: '140px', textAlign: 'center' }}>{timeLeft}</span>
        
        {/* O Componente da Câmera AGORA É O BOTÃO VISUAL */}
        <CameraComponent rollId={idRaw} onUploadComplete={handleUploadSuccess} />
      </div>

      {/* Galeria */}
      <div className="gallery-grid">
        <GalleryComponent rollId={idRaw} />
      </div>
    </main>
  );
}