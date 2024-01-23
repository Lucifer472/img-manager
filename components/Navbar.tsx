"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { logout } from "@/actions/logout";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-center pt-4">
      <div className="bg-white rounded-md shadow-sm w-[80%] h-20 flex items-center justify-center gap-x-6">
        <Button
          variant={pathname === "/images" ? "default" : "outline"}
          asChild
        >
          <Link href={"/images"}>Images</Link>
        </Button>
        <Button
          variant={pathname === "/websites" ? "default" : "outline"}
          asChild
        >
          <Link href={"/websites"}>Websites</Link>
        </Button>
        <Button
          variant={pathname === "/register" ? "default" : "outline"}
          asChild
        >
          <Link href={"/register"}>Register</Link>
        </Button>
        <Button
          variant={pathname === "/profile" ? "default" : "outline"}
          asChild
        >
          <Link href={"/profile"}>Profile</Link>
        </Button>
        <Button onClick={async () => logout()} variant={"destructive"}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
