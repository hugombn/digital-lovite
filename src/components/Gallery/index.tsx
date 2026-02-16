'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface MediaItem {
  id: string;
  roll_id: string;
  url: string;
  type: 'image' | 'video';
  reveal_at: string;
  created_at: string;
}

export const GalleryComponent = ({ rollId }: { rollId: string }) => {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetchMedia();
  }, [rollId]);

  const fetchMedia = async () => {
    // Busca as fotos do Supabase
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('roll_id', rollId)
      .order('created_at', { ascending: false });

    if (error) console.error('Erro ao buscar fotos:', error);
    else setItems(data || []);
  };

  // --- A BATOTA PARA VERES JÁ ---
  // Muda isto para 'false' quando quiseres voltar a bloquear as fotos!
  const forceReveal = false; 

  return (
    <>
      {/* 1. Cabeçalho de "Prontas a descarregar" (Só aparece se estiver revelado) */}
      {forceReveal && items.length > 0 && (
        <div className="revealed-header">
           <div className="revealed-title">PRONTAS A DESCARREGAR</div>
           <div className="hearts">💕</div>
        </div>
      )}

      {/* 2. A Grelha de Fotos */}
      {items.map((item, index) => (
        <div key={index} className={`photo-card ${forceReveal ? 'revealed' : ''}`}>
          
          {forceReveal ? (
            // --- MODO REVELADO: Mostra a foto ---
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.type === 'video' ? (
                <video src={item.url} controls className="photo-img" />
              ) : (
                <img src={item.url} alt="Foto" className="photo-img" />
              )}
            </a>
          ) : (
            // --- MODO BLOQUEADO: Mostra o cadeado ---
            <div className="lock-icon">🔒</div>
          )}

        </div>
      ))}

      {/* Se não houver fotos nenhumas, mostra mensagem */}
      {items.length === 0 && (
        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '20px', opacity: 0.5 }}>
          Este rolo ainda está vazio. Tira a primeira foto!
        </div>
      )}
    </>
  );
};