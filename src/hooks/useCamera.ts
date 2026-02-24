import { supabase } from '../lib/supabase';
import { getRevealDate } from '../lib/utils';

export const useCamera = (rollId: string) => {
  const uploadMedia = async (file: File, mediaType: 'image' | 'video' = 'image') => {
    try {
      // 1. Criar um nome único para o ficheiro
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${rollId}/${fileName}`;

      // 2. Upload para o Storage (Bucket 'photos')
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Obter a URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // 4. Salvar na tabela 'media' com a regra do "dia seguinte"
      const { error: dbError } = await supabase.from('media').insert({
        roll_id: rollId,
        url: publicUrl,
        type: mediaType,
        reveal_at: getRevealDate(), // Definido em lib/utils.ts
      });

      if (dbError) throw dbError;

      return { success: true };
    } catch (error) {
      console.error('Erro no upload:', error);
      return { success: false, error };
    }
  };

  return { uploadMedia };
};