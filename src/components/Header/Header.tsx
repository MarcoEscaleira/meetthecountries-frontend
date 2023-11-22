import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import mtcLogo from "../../../public/images/mtc-logo.svg";

export const MenuLink: FC<{
  href: string;
  title: string;
}> = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="w-32 text-center px-6 py-2 font-medium text-white transition-colors duration-300 transform bg-blue-200 rounded-lg hover:bg-blue-500"
    >
      {title}
    </Link>
  );
};

export function Header() {
  return (
    <header className="flex w-full justify-between items-center h-16 px-8">
      <Image src={mtcLogo} width={58} height={54} alt="Planet Earth" className="" />
      <nav className="flex gap-8 items-center">
        <MenuLink href="/" title="Home" />
        <MenuLink href="/map" title="Map" />
        <MenuLink href="/about" title="About" />
      </nav>
      <UserIcon className="w-10 h-10" />
    </header>
  );
}
