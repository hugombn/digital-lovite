'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';

interface MediaItem {
  id: string; roll_id: string; url: string;
  type: 'image' | 'video';
}

// Repara que agora recebemos o "isRevealed" ali em baixo
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
           <div style={{ letterSpacing: '2px' }}>PRONTAS A DESCARREGAR 💕</div>
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
               className="photo-link"
               title="Clique para ver original e descarregar"
            >
              {item.type === 'video' ? (
                <video src={item.url} className="photo-img" />
              ) : (
                <img src={item.url} alt="Foto" className="photo-img" />
              )}
            </a>
          ) : (
            // --- MODO BLOQUEADO ---
            <div className="lock-icon flex items-center justify-center">
              <Lock size={14} color="white" />
            </div>
          )}

        </div>
      ))}
      
      {items.length === 0 && (
        <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, padding: '40px' }}>
          Ainda não há memórias neste rolo. Começa a fotografar! 📸
        </div>
      )}
    </>
  );
};