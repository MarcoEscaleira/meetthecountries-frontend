import Link from "next/link";
import { FC } from "react";

export const MenuLink: FC<{
  href: string;
  title: string;
}> = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="px-6 py-2 font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500"
    >
      {title}
    </Link>
  );
};

export function Header() {
  return (
    <header className="flex w-full justify-between items-center h-16 px-8">
      <h2>MtC</h2>

      <nav className="flex gap-8 items-center">
        <MenuLink href="/" title="Home" />
        <MenuLink href="/map" title="Map" />
        <MenuLink href="/about" title="About" />
      </nav>
    </header>
  );
}
