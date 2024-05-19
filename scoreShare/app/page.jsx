"use client";

import { LoginButton } from "@/components/auth/login-button";
import { NavLogo } from "@/components/nav-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Nanum_Gothic_Coding, Poppins, Roboto } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const title = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400"],
});

const body = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="flex flex-col items-center h-[100vh] gap-2 p-2 mx-auto border landing-page">
      <video
        autoPlay
        loop
        muted
        className="fixed bottom-0 aspect-video max-h-[100vh] max-w-[100vw] right-0 h-[100vh] w-[100vw] object-fill -z-10"
      >
        <source src="/squares.mp4" type="video/mp4" />
      </video>
      <nav className="h-[6vh] md:h-[11vh] border-b px-4 w-full flex items-end justify-between">
        <NavLogo />
        <LoginButton>
          <Button
            variant="outline"
            size="default"
            className="mb-1 text-white bg-indigo-500 rounded-full "
          >
            Sign in
          </Button>
        </LoginButton>
      </nav>

      <section className="grid w-full grid-cols-1 gap-5 h-max md:h-[89vh]  md:grid-cols-2">
        <div className="flex flex-col h-[inherit] p-1 md:p-0 w-full gap-2 items-center  md:items-end justify-center rounded-sm  bg-gradient-to-b from-purple-400/20 to-emerald-50/10 text-primary">
          <div className="flex items-end ">
            <Image
              src="https://static.thenounproject.com/png/654373-200.png"
              alt="star"
              width={48}
              height={48}
            />
            <small className="font-bold text-white">Best app of 2021</small>
          </div>
          <h1
            className={cn(title.className, "text-5xl leading-snug text-center")}
          >
            <span className="text-white text-shadow-black">
              It&apos;s all about
            </span>
            <span
              className={cn(
                font.className,
                "px-4 rounded-full bg-emerald-500 text-shadow-white "
              )}
            >
              music
            </span>
          </h1>
          <p
            className={cn(
              body.className,
              "w-full md:w-10/12 my-2 text-center md:text-right hyphens-auto break-before-right"
            )}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            cupiditate voluptates facilis beatae aut aliquid labore quisquam
            reprehenderit tempore omnis, asperiores nesciunt. Ab eum veniam
            magnam natus! Architecto, nesciunt velit!
          </p>
          <div className="flex gap-2">
            <button className="hover:tracking-[.2rem] md:hover:tracking-custom self-end h-fit px-[1.6rem] py-[.8rem] bg-emerald-500 text-white text-lg rounded-full transition-all duration-300 hover:bg-indigo-500 w-full">
              JOIN US NOW!
            </button>
            <Image
              src="/pngwing.com.png"
              width={100}
              height={100}
              className="hidden md:block"
              alt="arrow"
            />
          </div>
        </div>
        <div className="flex items-center w-full h-[inherit]">
          <Image
            alt=""
            src="/logo.png"
            width={800}
            height={800}
            className="w-[90%] max-h-[80vh] h-auto mx-auto transition-all main-logo !aspect-square"
          />
        </div>
      </section>
    </main>
  );
}
