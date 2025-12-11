import type { Metadata } from "next";

import { Karla } from "next/font/google";
import "./globals.css";
import Nav from "./Nav";

const karla = Karla({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watchin'",
  description: "Salve e organize seus filmes e séries favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${karla.className} antialiased grid grid-rows-1 grid-cols-[1fr_6fr] h-screen`}
      >
        <nav>
          <Nav />
        </nav>
        {children}
      </body>
    </html>
  );
}
