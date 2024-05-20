import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
