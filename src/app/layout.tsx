import "../styles/index.css";
import type { Metadata } from "next";
import { FloatingToolbar } from "../components/floating-toolbar";
import { getSiteTheme } from "../actions/settings-actions";

export const metadata: Metadata = {
  title: "BatdongsanHappyM",
  description: "Bất động sản cao cấp",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteTheme = await getSiteTheme();
  const primaryColor = siteTheme?.primaryColor;

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
        {primaryColor && (
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --color-earth-brown: ${primaryColor};
            }
          `}} />
        )}
      </head>
      <body className="antialiased font-body-md bg-surface text-on-surface">
        {children}
        <FloatingToolbar />
      </body>
    </html>
  );
}

