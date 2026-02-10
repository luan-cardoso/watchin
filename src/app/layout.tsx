import type { Metadata } from "next";

import { Karla } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import { Nav } from "@/features/navigation";
import NavMobile from "@/features/navigation/components/NavMobile";

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
          className={`${karla.className} antialiased grid grid-rows-[1fr_9fr] md:grid-cols-[1fr_6fr] lg:grid-cols-[1fr_6fr] xl:grid-cols-[1fr_6fr] h-screen`}
        >
          <nav className="hidden md:block">
            <Nav />
          </nav>
          <nav className="md:hidden">
            <NavMobile />
          </nav>
          <div className="overflow-y-auto min-h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
