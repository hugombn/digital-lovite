'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, PlayCircle } from 'lucide-react'; // Adicionei o ícone de Play

interface MediaItem {
  id: string; roll_id: string; url: string;
  type: 'image' | 'video'; // Confirma que a tua base de dados tem esta coluna!
}

export const GalleryComponent = ({ rollId, isRevealed }: { rollId: string, isRevealed: boolean }) => {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await supabase
        .from('media')
        .select('*')
        .eq('roll_id', rollId)
        .order('created_at', { ascending: false });
      if (data) setItems(data);
    };
    fetchMedia();
  }, [rollId]);

  return (
    <>
      {isRevealed && items.length > 0 && (
        <div className="revealed-header">
           <div style={{ letterSpacing: '2px' }}>PRONTAS A DESCARREGAR</div>
           <div style={{ fontSize: '20px', marginTop: '5px' }}>💕</div>
        </div>
      )}

      {items.map((item, index) => (
        <div key={index} className={`photo-card ${isRevealed ? 'revealed' : ''}`}>
          
          {isRevealed ? (
            // --- MODO REVELADO ---
            <a 
               href={item.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="photo-link relative group" // 'relative' para posicionar o ícone play
               title="Clique para abrir"
            >
              {item.type === 'video' ? (
                <>
                  {/* O Vídeo em si (mute e loop para parecer uma 'foto mexida') */}
                  <video 
                    src={item.url} 
                    className="photo-img" 
                    muted 
                    playsInline
                    loop
                    // onMouseOver={e => e.currentTarget.play()} // Opcional: Toca ao passar o rato
                    // onMouseOut={e => e.currentTarget.pause()}
                  />
                  {/* Ícone de Play por cima para identificar que é vídeo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <PlayCircle size={32} color="white" className="opacity-80 drop-shadow-md" />
                  </div>
                </>
              ) : (
                <img src={item.url} alt="Foto" className="photo-img" />
              )}
            </a>
          ) : (
            // --- MODO BLOQUEADO ---
            <div className="lock-icon flex items-center justify-center">
               {/* Se for vídeo, mostra ícone de play, se for foto, cadeado? 
                   Ou mostra sempre cadeado para ser surpresa? Vamos manter o cadeado. */}
               <Lock size={14} color="white" />
            </div>
          )}

        </div>
      ))}
      
      {items.length === 0 && (
        <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, padding: '40px' }}>
          Rolo vazio... Tira a primeira foto ou vídeo! 📸 🎥
        </div>
      )}
    </>
  );
};