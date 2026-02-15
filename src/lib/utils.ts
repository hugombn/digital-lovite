// src/lib/utils.ts
export function getRevealDate() {
  const now = new Date();
  const tomorrow = new Date(now);
  
  // Adiciona 1 dia e define para as 09:00:00 da manhã
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  
  return tomorrow.toISOString();
}