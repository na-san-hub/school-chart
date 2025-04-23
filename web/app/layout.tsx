import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReset from "@/components/ScrollReset";
import { AuthProvider } from "@/context/AuthContext/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <ScrollReset />
          <main className="flex flex-col flex-grow w-full mx-auto">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
