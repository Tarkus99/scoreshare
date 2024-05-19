import { getTrackById } from "@/data/track";
import Image from "next/image";
import { Label } from "./ui/label";
import { RiSpotifyFill } from "react-icons/ri";
import { Button } from "./ui/button";

export const TrackInfo = async ({ id }) => {
  console.log("render track info");
  const trackInfo = await getTrackById(id);
  return (
    <section className="flex flex-wrap items-center justify-center h-auto p-1 rounded-lg bg-slate-100/70">
      {trackInfo && (
        <>
          <div className="order-2 w-3/4">
            <Image
              alt=""
              width={800}
              height={0}
              quality={100}
              className="h-auto mx-auto rounded-sm shadow-sm w-96 aspect-square"
              src={trackInfo.image}
            />
          </div>
          <div className="grid w-full grid-flow-row-dense grid-cols-2 gap-2 p-4 text-center md:grid-cols-3 text-primary">
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="font-bold uppercase text-primary/80 border-b-[1px] border-mypurple">
                Title
              </Label>
              <p className="capitalize ">{trackInfo.name}</p>
            </div>
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="font-bold uppercase text-primary/80 border-b-[1px] border-mypurple">
                Source
              </Label>
              <p className="capitalize ">{trackInfo.source}</p>
            </div>
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="flex items-center justify-center font-bold uppercase text-primary/80 gap-x-2">
                <span className=" border-b-[1px] border-mypurple">Artists</span>{" "}
                <RiSpotifyFill color="green" />
              </Label>
              <p className="flex flex-wrap justify-center capitalize">
                {trackInfo.artists.map((artist) => (
                  <Button variant="link" asChild>
                    <a href={artist.link}>{artist.name}</a>
                  </Button>
                ))}
              </p>
            </div>
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="font-bold uppercase text-primary/80 border-b-[1px] border-mypurple">
                Date
              </Label>
              <p>{new Date(trackInfo.date).toDateString()}</p>
            </div>
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="font-bold uppercase text-primary/80 border-b-[1px] border-mypurple">
                Key
              </Label>
              <p className="capitalize ">{trackInfo.key}</p>
            </div>
            <div className="p-2 bg-white border rounded-lg shadow border-cyan-700 backdrop-blur bg-none">
              <Label className="font-bold uppercase text-primary/80 border-b-[1px] border-mypurple">
                Tempo
              </Label>
              <p className="capitalize ">{trackInfo.tempo}bpm</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};