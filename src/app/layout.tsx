import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Footer, Header } from "@/components";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

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
    <>
      <html lang="en">
        <body className={roboto.className} id="root">
          <ApolloWrapper>
            <Header />
            <main className="relative flex h-screen w-screen flex-col">{children}</main>
            <Footer />

            <ToastContainer />
          </ApolloWrapper>
        </body>
      </html>
    </>
  );
}
