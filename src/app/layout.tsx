import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="flex w-full h-[calc(100%-64px)]">{children}</main>
      </body>
    </html>
  );
}
