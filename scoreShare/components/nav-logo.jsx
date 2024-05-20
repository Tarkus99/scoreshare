import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const NavLogo = () => {
  return (
    <Link href={"/dashboard"}>
      <span className="flex">
        <h1 className={cn( "text-lg md:text-2xl text-white seld-enf")}>
          scoreShare{" "}
        </h1>
        <div className="h-min">
          <Image
            src="/trinagles.png"
            alt=""
            width={20}
            height={0}
            className="aspect-square !min-w-5 !w-[1rem]"
          />
        </div>
      </span>
    </Link>
  );
};
