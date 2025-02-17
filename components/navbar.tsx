"use client";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

export default function Navbar() {
  const { email, name, clearUser } = useUserStore();
  const { data: session } = useSession();

  const handleLogout = () => {
    if (email) clearUser();
    else signOut();
  };
  return (
    <nav className="h-[60px] flex justify-between items-center">
      <div className="lobster-font text-[25px] text-blue-600 tracking-[3px] font-bold">
        EliCMS
      </div>

      {(session && session?.user) || email ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Image
              src={session?.user?.image || "/trustwing.webp"}
              width={40}
              height={40}
              alt="Github Profile"
              className="rounded-full object-cover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="outline-none mr-[10px]">
            <DropdownMenuLabel>
              {session?.user?.name} {name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </nav>
  );
}
