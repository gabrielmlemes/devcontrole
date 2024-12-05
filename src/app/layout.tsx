import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/index";
import { AuthProvider } from "@/providers/auth";

import { Sora } from "next/font/google";
import { ModalProvider } from "@/providers/modal";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  subsets: ["latin"], // Inclui caracteres latinos
  weight: ["400", "600", "700"], // Escolha os pesos necessários
  variable: "--font-sora", // Define uma variável CSS opcional
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
    <html lang="en" className="h-full">
      <body className={`flex min-h-screen flex-col ${sora.className}`}>
        <AuthProvider>
          <ModalProvider>
            <Toaster />
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="border-t bg-slate-50 py-4 text-center text-sm font-semibold text-gray-600">
              Desenvolvido por Gabriel Lemes
            </footer>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
