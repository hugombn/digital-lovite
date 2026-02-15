'use client';

import React, { useRef, useState } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { Camera, Upload, Loader2 } from 'lucide-react';

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

    setLoading(true);
    const result = await uploadMedia(file);
    
    if (result.success) {
      alert("Foto capturada! Será revelada amanhã às 09:00.");
      onUploadComplete();
    } else {
      alert("Erro ao guardar a foto.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-3xl shadow-xl">
      <input
        type="file"
        accept="image/*,video/*"
        capture="environment" // Abre a câmera traseira no telemóvel
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="w-24 h-24 bg-yellow-400 rounded-full border-8 border-yellow-500 flex items-center justify-center active:scale-95 transition-transform shadow-inner disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-10 h-10 animate-spin text-yellow-700" />
        ) : (
          <Camera className="w-10 h-10 text-yellow-900" />
        )}
      </button>
      
      <p className="font-bold text-yellow-800 uppercase tracking-widest text-sm">
        {loading ? "A Revelar..." : "Tirar Foto"}
      </p>
    </div>
  );
};