"use client";
import { UserIcon } from "@heroicons/react/24/solid";

export function Header() {
  return (
    <header className="absolute top-0 left-0 z-10 w-full px-4 py-2 sm:px-6 sm:py-4">
      <div className="flex justify-end items-center">
        <UserIcon className="w-8 h-10 cursor-pointer sm:w-10" />
      </div>
    </header>
  );
}
