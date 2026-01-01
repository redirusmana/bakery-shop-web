"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import { useAuthStore } from "@/stores/use-auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserNav() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/account/login");
  };

  if (!isAuthenticated || !user) {
    return (
      <Link
        href="/account/login"
        className="text-xs font-semibold text-white transition-opacity hover:opacity-70 "
      >
        ACCOUNT
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <span className="text-xs font-semibold text-white transition-opacity hover:opacity-70 cursor-pointer">
          <UserCircle className="h-6 w-6" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white rounded-none border-gray-200 mt-2"
      >
        <DropdownMenuLabel className="font-sans font-semibold text-sm">
          Hi, {user.firstName} {user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="font-sans text-[10px] font-bold uppercase text-sm text-destructive cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
