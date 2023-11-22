"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export const MenuLink: FC<{
  href: string;
  title: string;
  isActive: boolean;
}> = ({ href, title, isActive }) => {
  return (
    <Link
      href={href}
      className={`w-16 sm:w-32 text-sm sm:text-md py-2 font-medium text-center text-white ${
        isActive ? "bg-blue-500" : ""
      } transition-colors duration-300 transform bg-blue-200 rounded-lg hover:bg-blue-500`}
    >
      {title}
    </Link>
  );
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 px-2 sm:px-8 flex justify-center">
      <div className="flex container gap-2 justify-between items-center">
        <Link href="/">
          <Image src="/images/mtc-logo.svg" width={40} height={40} alt="Planet Earth" className="w-10 sm:w-16" />
        </Link>
        <nav className="flex gap-2 sm:gap-8 items-center">
          <MenuLink href="/" title="Home" isActive={pathname === "/"} />
          <MenuLink href="/map" title="Map" isActive={pathname === "/map"} />
          <MenuLink href="/about" title="About" isActive={pathname === "/about"} />
        </nav>
        <UserIcon className="w-8 sm:w-10 h-10 cursor-pointer" />
      </div>
    </header>
  );
}
