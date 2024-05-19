import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Damion, Dekko, Fira_Sans, Hedvig_Letters_Serif, IBM_Plex_Sans, Inconsolata, Inter, Inter_Tight, Kalnia, Kanit, Karla, La_Belle_Aurore, Libre_Franklin, Manrope, Montez, Montserrat, Mulish, Open_Sans, Oswald, Poppins, Proza_Libre, Quicksand, Raleway, Roboto, Roboto_Serif, Sacramento, Sail, Source_Sans_3, Space_Grotesk, Syne_Tactile, Titillium_Web } from "next/font/google";
import Image from "next/image";

const font = Inter({
  subsets: ["latin"],
  weight: ["300", "400",],
  adjustFontFallback: false,
});

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(font.className, "antialiased text-primary font-light")}
        >
          <Image
            src="/back7.svg"
            height={1080}
            width={1920}
            alt="background"
            className="fixed bottom-0 right-0 min-h-[100%] min-w-[100%] object-fill -z-10"
          />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
