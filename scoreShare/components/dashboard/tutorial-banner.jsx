"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { TutorialItem } from "./tutorial-item";
import { Semibold } from "./semibold";
import { Manrope } from "next/font/google";

export const TutorialBanner = () => {
  return (
    <Accordion
      type="single"
      collapsible={true}
      className="w-full rounded bg-cyan-700/40"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-10 decoration-white">
          <h2 className="text-xl text-white">First time in here?</h2>
        </AccordionTrigger>
        <AccordionContent className="px-5">
          <p className="w-full mb-2 text-center text-white text-pretty hyphens-auto">
            So you just have landed in here? Don't worry, we will explain how
            this web works and how you can use it. It's easy, but just in case,
            here are some tips that migth help you:
          </p>
          <ol type="1" className="space-y-2 text-white ms-8">
            <TutorialItem>
              <p>
                You're a great musician and you're looking for an arrangement of
                your favorite track, right?<br></br>
                Type it in the <Semibold>search bar</Semibold> at the top of the
                page:
              </p>
              <Image
                alt="tip1"
                width={400}
                height={400}
                src={"/tutorial/searchbar.png"}
                className="my-2 rounded drop-shadow-lg ms-12"
              />
              <p>
                If you cannot find the track, probably it hasn't been uploaded.
                But don't worry, you can click on the
                <Semibold>"Create new track"</Semibold> button and in the next
                step you will be able to create it yourself!
              </p>
            </TutorialItem>
            <TutorialItem>
              <p>
                Here's where the magic beggins. We all know that Spotify keeps
                track of every song you can think of (or almost all of them).
                But there are so many live performances or recordings that are
                untracked, and it's very hard to find an arrangement for that
                track. If you have an arrangement that you want to share with
                others musicians, you can attach it to it's corresponding track
                (wheter it's tracked by Spotify or not).
              </p>
              <ul className="!list-disc ">
                <li className="ms-12">
                  <div>
                    <p>
                      Find the track in Spotify by typing it on the search bar.
                      By clicking on a list item,&nbsp;
                      <Semibold>
                        it's information will be inserted in the fields.
                      </Semibold>
                    </p>
                    <Image
                      alt="tip1"
                      width={600}
                      height={600}
                      src={"/tutorial/spoty_searchbar.png"}
                      className="my-2 rounded ms-12 drop-shadow-lg"
                    />
                  </div>
                </li>
                <li className="ms-12">
                  <div>
                    <p>
                      If the track you're thinking of is not tracked by Spotify,
                      you can fill the fields by your own:
                    </p>
                    <ul className="list-inside ms-4">
                      <li>
                        <span className="font-bold">Title:</span> name of the
                        song, track or tune.
                      </li>
                      <li>
                        <span className="font-bold">Source:</span> where is the
                        track taken from&nbsp;
                        <small>
                          (for live performances it is recommended to follow the
                          naming convention{" "}
                          <Semibold>"Live At {"'Source'"}"</Semibold>).
                        </small>
                      </li>
                      <li>
                        <span className="font-bold">Artist:</span> search in
                        Spotify the artist or list of artists that perform the
                        track.
                      </li>
                      <li>
                        <span className="font-bold">Date:</span> date in wich
                        the performance took place.
                      </li>
                    </ul>
                    <Image
                      alt="tip1"
                      width={600}
                      height={600}
                      src={"/tutorial/fields.png"}
                      className="my-2 rounded ms-12 drop-shadow-lg"
                    />
                  </div>
                </li>
                <li className="ms-12">
                  <div>
                    <p>
                      Then you are able to choose the key of the track and the
                      tempo. At the moment, you can only choose one key and one
                      tempo, but soon it will be available to choose more than
                      one.
                    </p>
                    <Image
                      alt="tip1"
                      width={400}
                      height={400}
                      src={"/tutorial/fields2.png"}
                      className="my-2 rounded ms-12 drop-shadow-lg"
                    />
                  </div>
                </li>
                <li className="ms-12">
                  <div>
                    <p>
                      Last but not least, at the moment of create a new track,
                      it is <Semibold>mandatory</Semibold> to attach a file to
                      it, whether it is a <Semibold>mp3, mp4 or pdf. </Semibold>
                      The goal of this is to avoid tracks without files. You can
                      upload a file and set the name for which it will be seen
                      to the users. Then you must choose the instrument for
                      which the file is intended for.
                    </p>
                    <Image
                      alt="tip1"
                      width={600}
                      height={600}
                      src={"/tutorial/filemandatory.png"}
                      className="my-2 rounded ms-12 drop-shadow-lg"
                    />
                  </div>
                </li>
              </ul>
            </TutorialItem>
            <TutorialItem>
              <p>
                Once the track has been uploaded, you can search it in the top
                search bar and you will be redirect to the track page. In this
                page you'll find the basic information concerning the track, and
                at the bottom, a table will be displayed. This table contains
                all the files the users have upload to that track, and you can
                filter them by <Semibold>type or instrument.</Semibold>
              </p>
              <Image
                alt="tip1"
                width={600}
                height={600}
                src={"/tutorial/filestable.png"}
                className="my-2 rounded drop-shadow-lg ms-12"
              />
              <p>
                Let's try by
                <Semibold> clicking on a row</Semibold>.
              </p>
            </TutorialItem>
            <TutorialItem>
              <p>
                A modal window will appear. The
                file will be displayed for a preview. You can download it by
                clicking the{" "}
                <Semibold>
                  top button next to the file's owner username.
                </Semibold>
              </p>
              <Image
                alt="tip1"
                width={700}
                height={700}
                src={"/tutorial/fileviewer.png"}
                className="my-2 rounded drop-shadow-lg ms-12"
              />
              <p>
                Under the file preview a list of commentaries concerning the
                file will appear. You can add, reply, edit or delete a
                commentary, and even like or dislike others users comments!
              </p>
            </TutorialItem>
            <TutorialItem>
              <p>
                Finally, you can manage your uploaded files in your profile.
                Click on the avatar at the{" "}
                <Semibold>top right corner of the page</Semibold> and select{" "}
                <Semibold>"Go to profile"</Semibold>
              </p>
              <Image
                alt="tip1"
                width={300}
                height={300}
                src={"/tutorial/avatra.png"}
                className="my-2 rounded drop-shadow-lg ms-12"
              />
              <p>
                In the <Semibold>activity</Semibold> tab you'll find all the
                tracks that you've already uploaded. They can be edit or deleted
                if you wish.
                <Image
                  alt="tip1"
                  width={600}
                  height={600}
                  src={"/tutorial/activitytab.png"}
                  className="my-2 rounded drop-shadow-lg ms-12"
                />
                <p>
                  <Semibold>Quick reminder:</Semibold> in order to avoid tracks
                  with no files, you won't be able to delete the file that you
                  first uploaded on creating the track.
                </p>
              </p>
            </TutorialItem>
             <TutorialItem>
                <p>And that's all, I hope you got the main idea and find yourself confident on start using the application!</p>
             </TutorialItem>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
