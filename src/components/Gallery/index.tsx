'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

// Definimos o tipo aqui mesmo para facilitar
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
  const [loading, setLoading] = useState(true);

  // Função que busca as fotos
  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('roll_id', rollId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar fotos:', error);
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    
    // Atualiza a galeria a cada 10 segundos
    const interval = setInterval(fetchMedia, 10000);
    return () => clearInterval(interval);
  }, [rollId]);

  if (loading) return <div className="text-center p-4">A carregar rolo...</div>;

  if (items.length === 0) {
    return <div className="text-center p-10 text-gray-500">Este rolo ainda está vazio. Tira a primeira foto!</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {items.map((item) => {
        // Verifica se já passou da hora de revelar
        const isRevealed = new Date(item.reveal_at) <= new Date();

        return (
          <div key={item.id} className="aspect-square relative overflow-hidden bg-zinc-200 border border-zinc-400 rounded-sm shadow-sm">
            {isRevealed ? (
              // SE JÁ REVELOU: Mostra a foto/vídeo
              item.type === 'video' ? (
                <video src={item.url} controls className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt="Foto revelada" className="w-full h-full object-cover" />
              )
            ) : (
              // SE AINDA NÃO REVELOU: Mostra aviso
              <div className="flex flex-col items-center justify-center h-full text-[10px] text-zinc-500 font-mono text-center p-1 bg-zinc-100">
                <span className="font-bold text-lg mb-1">⏳</span>
                <span>REVELANDO...</span>
                <span className="text-[8px] mt-1 opacity-70">
                  {new Date(item.reveal_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};