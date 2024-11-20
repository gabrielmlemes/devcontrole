import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header/index";
import { AuthProvider } from "@/providers/auth";

import { Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'], // Inclui caracteres latinos
  weight: ['400', '600', '700'], // Escolha os pesos necessários
  variable: '--font-sora', // Define uma variável CSS opcional
});

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento",
  description: "Gerencie seus clientes e atendimentos de forma fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={sora.className}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
