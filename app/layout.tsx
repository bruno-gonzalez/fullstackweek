import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer";
import AuthProvider from "./_components/auth-provider";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Barber HUB - Agendamento de Barbearia", 
  description: "Agende seu horário nas melhores barbearias de forma rápida e fácil",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <div className="flex-1">{children}</div>

          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
