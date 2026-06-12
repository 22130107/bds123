import "../styles/index.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modern Estate",
  description: "Bất động sản cao cấp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased font-body-md bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
