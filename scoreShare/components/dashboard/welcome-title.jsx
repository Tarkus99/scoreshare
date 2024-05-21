"use client";

import { useUser } from "@/hooks/use-current-user";
import { MyManrope } from "../misc/manrope";

export const WelcomeTitle = () => {
  const user = useUser();
  return (
    <h1
      id="tutorial-top"
      className="w-full text-2xl font-semibold text-white border-b-2 border-white md:text-4xl"
    >
      <MyManrope>Welcome {user.name}</MyManrope>
    </h1>
  );
};
