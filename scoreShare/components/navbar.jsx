import React from "react";
import { SearchBar } from "./searchBar/search-bar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NavLogo } from "./nav-logo";
import { UserButton } from "./profile/user-button";

export const NavBar = async () => {
  return (
    <nav className="flex items-center justify-between w-11/12 p-4 mx-auto rounded-sm shadow-sm bg-slate-50/0">
      <div className="flex gap-x-2">
        <NavLogo />
      </div>
      <Dialog>
        <DialogTrigger>
          <SearchBar isSearching={false}/>
        </DialogTrigger>
        <DialogContent className="top-[40%] md:top-[25%] bg-black/30 p-2 border-purple-400 flex w-full max-w-[30rem]">
          <SearchBar isSearching={true}/>
        </DialogContent>
      </Dialog>

      <UserButton />
    </nav>
  );
};
