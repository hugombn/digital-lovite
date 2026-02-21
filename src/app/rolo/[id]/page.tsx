'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CameraComponent } from '../../../components/Camera';
import { GalleryComponent } from '../../../components/Gallery';

// --- DEFINE AQUI A DATA DO CASAMENTO (Ou a data de teste) ---
const REVEAL_DATE = new Date('2026-02-12T09:00:00'); 

export default function RoloPage() {
  const params = useParams();
  const idRaw = params?.id as string;
  const title = idRaw ? idRaw.replace(/-/g, ' ').toUpperCase() : '...';

  const [timeLeft, setTimeLeft] = useState("A calcular...");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = REVEAL_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Fotos Reveladas! 🎉");
        setIsRevealed(true);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      if (d > 0) {
        setTimeLeft(`${d} d ${h} h ${m} min ${s} s`);
      } else {
        setTimeLeft(`${h} h ${m} min ${s} s`);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); 
    return () => clearInterval(timer);
  }, []);

  const handleUploadSuccess = () => {
    window.location.reload();
  };

  return (
    <main>
      <img src="/bg-floral.jpg" alt="fundo" className="bg-floral" />

      <header className="header-container">
        <img src="/logo.png" alt="Lovite" className="logo-img" />
        <h1 className="title">ROLO DE CÂMERA {title} </h1>
      </header>

      <div className="info-bar">
        <span style={{ minWidth: '140px', textAlign: 'center' }}>{timeLeft}</span>
        
        {!isRevealed && (
          <CameraComponent rollId={idRaw} onUploadComplete={handleUploadSuccess} />
        )}
      </div>

      <div className="gallery-grid">
        {/* AQUI ESTÁ A MAGIA: A página diz à Galeria se está revelado ou não */}
        <GalleryComponent rollId={idRaw} isRevealed={isRevealed} />
      </div>
    </main>
  );
}