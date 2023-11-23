import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 w-full flex justify-center">
      <section className="container flex items-center justify-between p-6 sm:p-4">
        <Link href="/">
          <Image src="/images/mtc-logo.svg" width={58} height={54} alt="Planet Earth" className="" />
        </Link>

        <nav className="flex justify-center flex-grow">
          <Link href="/about" className="text-sky-400 underline">
            About
          </Link>
        </nav>

        <span></span>
      </section>
    </footer>
  );
}
