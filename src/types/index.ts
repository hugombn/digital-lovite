export interface MediaItem {
  id: string;
  roll_id: string;
  url: string;
  type: 'image' | 'video';
  reveal_at: string;
  created_at: string;
}

export interface RollPageProps {
  params: Promise<{ id: string }>; // Ajuste para Next.js 15 (params agora é uma Promise)
}