import Image from "next/image";
import { NavBar } from "../../components/navbar";

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Image
        src="/back7.svg"
        height={1080}
        width={1920}
        alt="background"
        className="fixed bottom-0 right-0 min-h-[100%] min-w-[100%] object-fill -z-10"
      />
      <div className="flex flex-col w-full p-2 min-h-[100%] h-fit gap-y-5 justify-between ">
        <NavBar />
        <main className="flex flex-col items-center justify-start flex-1 w-full mx-auto font-normal h-min">
          {children}
        </main>
        <footer className="p-4 text-white rounded-sm bg-slate-50/20">
          <p>Gabriel Enguídanos Nebot, 2º DAW IES La vereda</p>
        </footer>
      </div>
    </>
  );
};

export default ProtectedLayout;
