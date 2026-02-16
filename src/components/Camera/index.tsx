'use client';

import React, { useRef, useState } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface CameraProps {
  rollId: string;
  onUploadComplete: () => void;
}

export const CameraComponent = ({ rollId, onUploadComplete }: CameraProps) => {
  // Se o hook useCamera ainda não estiver pronto, esta parte pode dar erro.
  // Se der erro, avisa-me que fazemos uma versão simplificada para teste visual.
  const { uploadMedia } = useCamera(rollId); 
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Tenta fazer o upload
      const result = await uploadMedia(file);
      
      if (result && result.success) {
        // Se correu bem, avisa a página principal para atualizar
        onUploadComplete();
      } else {
        alert("Erro ao guardar. Tenta novamente.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro técnico no upload.");
    } finally {
      setLoading(false);
      // Limpa o input para permitir selecionar o mesmo ficheiro de novo
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* O Input real fica escondido */}
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
      />

      {/* ESTE É O BOTÃO VISUAL QUE APARECE NO ECRÃ */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        // Usamos a classe CSS que definimos no globals.css
        className="btn-upload-style"
        title="Adicionar Foto"
      >
        {loading ? (
          // Mostra um spinner a rodar se estiver a carregar
          <Loader2 className="w-6 h-6 animate-spin text-stone-600" />
        ) : (
          // Mostra o ícone da imagem normal
          <ImageIcon className="w-6 h-6 text-stone-600" />
        )}
      </button>
    </>
  );
};