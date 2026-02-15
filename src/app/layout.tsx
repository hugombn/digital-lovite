
export const metadata = {
  title: "Digital Lovite",
  description: "Câmera descartável digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}