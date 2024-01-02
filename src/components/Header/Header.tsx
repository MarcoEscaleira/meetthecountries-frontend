"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { LoginModal } from "@/components";

export function Header() {
  return (
    <>
      <header className="absolute left-0 top-0 z-10 w-full px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center justify-end">
          <Link href="#login">
            <UserIcon className="h-10 w-8 cursor-pointer sm:w-10" />
          </Link>
        </div>
      </header>

      <LoginModal />
    </>
  );
}
