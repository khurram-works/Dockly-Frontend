// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dockly - AI Customer Support Platform",
  description: "Turn Your Documents Into a 24/7 AI Support Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          These two link tags are the correct way to load external fonts in Next.js.
          
          The first one is a "preconnect" — it tells the browser to open a connection
          to fonts.googleapis.com early, before it even needs the font, so when the
          actual font request comes, the connection is already established. This speeds
          up font loading noticeably.
          
          The second preconnect is for fonts.gstatic.com — this is where Google actually
          stores the font FILES. The stylesheet from googleapis.com just references them;
          the actual bytes come from gstatic.com. The crossOrigin attribute is required
          here because it's a different domain than your app.
          
          The third link is the actual font stylesheet. Notice the URL carefully —
          this is the correct Material Symbols URL that loads the variable font with
          all axes (opsz, wght, FILL, GRAD) enabled.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}