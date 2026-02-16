import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // <--- ESTA É A LINHA MÁGICA QUE FALTA!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Lovite",
  description: "Câmera Descartável Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}