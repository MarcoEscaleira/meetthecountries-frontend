import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Meet the Countries",
  description:
    "An app to get to know more about the countries around the globe. Come and meet unknown countries by playing quizzes about them and interacting with friends",
  icons: {
    icon: "/images/planet-earth.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="flex flex-col w-screen h-screen relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
