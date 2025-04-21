"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  CONTACT_BUTTON_STRING,
  RESERVE_BUTTON_STRING,
} from "@/app/utils/constants/constants";

import MenuButton from "./utils/common/MenuButton";
import SmoothButton from "./utils/common/SmoothButton";
import AuthPanel from "./utils/common/AuthPanel";
import { useRouter } from "next/navigation";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <>
      <section className="h-[100vh] flex flex-col justify-between items-center">
        <div className="w-[98vw] flex justify-around gap-[20rem] items-center p-5">
          <div className="z-20">
            <MenuButton />
          </div>

          <div className="z-20">
            <h1 className="text-white text-5xl ml-[9rem]">PR Beauty</h1>
          </div>

          <div className="flex flex-row gap-[3rem] z-20">
            <Image
              src={"/assets/search.svg"}
              width={25}
              height={20}
              alt="logo"
            />
            { 
              isLoggedIn 
                ?
                null
                :
                <AuthPanel setIsLoggedIn={setIsLoggedIn} />
            }
            <Image src={"/assets/cart.svg"} width={25} height={20} alt="logo" />
          </div>
        </div>
        <div className="z-20 flex flex-row gap-10">
          <div onClick={() => router.push("/reservation")}>
            <SmoothButton name={RESERVE_BUTTON_STRING} />
          </div>
          <div>
            <SmoothButton name={CONTACT_BUTTON_STRING} />
          </div>
        </div>

        <div></div>
        <div></div>
        <video
          className="animate-slideindown absolute z-10 h-[100vh] w-[100vw] object-cover"
          muted
          autoPlay
          loop
        >
          <source src="/assets/home-background.webm" />
        </video>
      </section>

      <section>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
        <h1 className="text-6xl bg-red-400">Content</h1>
      </section>
    </>
  );
}
