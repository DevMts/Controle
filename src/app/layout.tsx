import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { ProgressProviders } from "@/providers/progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerencimaneto.",
  description: "Gerencie seus clientes e atendimentos de forma fácil!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            <ProgressProviders>
              {children}
            </ProgressProviders>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
