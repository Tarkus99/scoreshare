"use client";
import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa6";
import { LogOutButton } from "../auth/log-out-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { GoToProfileButton } from "../auth/go-to-profile-button";
AvatarImage;

export const UserButton = memo(() => {
  const user = useUser();
  return (
    <DropdownMenu className="relative">
      <DropdownMenuTrigger>
        <Avatar className="transition-all drop-shadow-md hover:scale-105">
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback className="bg-cyan-50">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 rounded-sm bg-indigo-100 w-fit">
        <GoToProfileButton>
          <DropdownMenuItem className="justify-around cursor-pointer hover:bg-indigo-300">
            Go to profile
          </DropdownMenuItem>
        </GoToProfileButton>
        <LogOutButton>
          <DropdownMenuItem className="justify-around cursor-pointer hover:bg-indigo-300">
            <ExitIcon className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
