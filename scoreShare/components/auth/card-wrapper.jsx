import logo from "@/public/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import Image from "next/image";
import { cn } from "@/lib/utils";


export const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  children,
  showSocial,
  id
}) => {
  return (
    <Card id={id} className="w-11/12 md:w-[29rem] drop-shadow-md relative font-[.8em] bg-slate/50">
     <CardHeader className="px-5 py-3 space-y-1 text-center">
        <CardTitle >
          <div className="flex items-center justify-center w-full text-center">
            <Image id="logo-img" src={logo} alt="" width={50} height="auto" className="transition-all aspect-square" />
          </div>
        </CardTitle>
        <CardDescription className={cn("text-2xl antialiased text-primary/80 font-bold")}>
          {headerLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">{children}</CardContent>
      <CardFooter>{showSocial && <Social />}</CardFooter>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
