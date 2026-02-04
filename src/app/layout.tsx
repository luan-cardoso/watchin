import type { Metadata } from "next";

import { Karla } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import { Nav } from "@/features/navigation";

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
      <AuthProvider>
        <body
          className={`${karla.className} antialiased grid grid-rows-1 grid-cols-[1fr_6fr] h-screen`}
        >
          <nav>
            <Nav />
          </nav>
          <div className="overflow-y-auto min-h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
