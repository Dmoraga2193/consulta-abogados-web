import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Consultas Legales",
  description: "Servicios legales integrales, innovadores y cercanos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Chatbot />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
