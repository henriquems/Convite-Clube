import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { ProvedorSessao } from "@/data/contexts/ContextoSessao";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Convite clube",
  description: "Sistema de Reserva de Convite Clube Cruzeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-100">
        <NextTopLoader
          color="#00a63e"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
          <ProvedorSessao>
            {children}
          </ProvedorSessao>
        <ToastContainer />
      </body>
    </html>
  );
}
