import "./globals.css";
import Header from "@/components/layout/Header";
import ScrollReset from "@/components/ScrollReset";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white">
        <Header />
        <ScrollReset />
        <main className="w-full mx-auto">{children}</main>
      </body>
    </html>
  );
}
