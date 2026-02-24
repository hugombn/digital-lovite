'use client';

import React, { useRef, useState } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { Image as ImageIcon, Loader2 } from 'lucide-react'; // Tirei o VideoIcon

interface CameraProps {
  rollId: string;
  onUploadComplete: () => void;
}

export const CameraComponent = ({ rollId, onUploadComplete }: CameraProps) => {
  const { uploadMedia } = useCamera(rollId); 
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Deteta se é vídeo ou imagem
    const fileType = file.type.startsWith('video/') ? 'video' : 'image';

    setLoading(true);
    try {
      const result = await uploadMedia(file, fileType);
      
      if (result && result.success) {
        onUploadComplete();
      } else {
        alert("Erro ao guardar. Tenta novamente.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro técnico no upload.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* O input continua a aceitar VÍDEOS e FOTOS */}
      <input
        type="file"
        accept="image/*,video/*,video/mp4,video/x-m4v"
        className="hidden"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
      />

      {/* O BOTÃO VOLTA A SER SIMPLES (SÓ ÍCONE DA GALERIA) */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="btn-upload-style"
        title="Adicionar Foto ou Vídeo"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin text-stone-600" />
        ) : (
          // Voltámos ao ícone original simples
          <ImageIcon className="w-6 h-6 text-stone-600" />
        )}
      </button>
    </>
  );
};