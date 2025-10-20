import AdminModeIndicator from '@/components/auth/AdminModeIndicator';
import type { Metadata } from "next";
import { inter, orbitron, jetbrainsMono } from "./fonts";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider"; 

export const metadata: Metadata = {
  title: "Kenneth Christopher Hendra",
  description: "Kenneth Christopher Hendra's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SessionProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
          <AdminModeIndicator />
        </SessionProvider>
      </body>
    </html>
  );
}
