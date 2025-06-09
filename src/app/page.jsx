"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  clientImages,
  CONTACT_BUTTON_STRING,
  partnerLogos,
  RESERVE_BUTTON_STRING,
} from "@/app/utils/constants/constants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import MenuButton from "./utils/common/MenuButton";
import SmoothButton from "./utils/common/SmoothButton";
import AuthPanel from "./utils/common/AuthPanel";
import ScissorsScrollReveal from "./utils/common/FramerMotion";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const router = useRouter();

  const handleRedirect = () => {
    isLoggedIn ? router.push("/reservation") : setVisible(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(token !== null);
    }
  }, []);

  return (
    <>
      <section className="h-[100vh] flex flex-col justify-between items-center">
        <div className="w-[98vw] flex justify-around gap-[20rem] items-center p-5">
          <div className="z-20">
            <MenuButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
            {isLoggedIn ? null : (
              <AuthPanel
                setIsLoggedIn={setIsLoggedIn}
                isVisible={isVisible}
                setVisible={setVisible}
              />
            )}
            <Image src={"/assets/cart.svg"} width={25} height={20} alt="logo" />
          </div>
        </div>
        <div className="z-20 flex flex-row gap-10">
          <div onClick={handleRedirect}>
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
      <section id="about" className="bg-black">
        <ScissorsScrollReveal />
      </section>
      <section id="gallery" className="bg-[#020508] h-100vh pt-14 pb-14">
        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {clientImages.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`Happy client ${i + 1}`}
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "85vh",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
                  <section id="partners" className="bg-white h-100vh p-5">
                    <Marquee
                      speed={70} // control the smooth speed
                      gradient={true} // optional gradient fade on edges
                      pauseOnHover
                    >
                      {partnerLogos.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Happy client ${index + 1}`}
                          style={{
                            height: "150px",
                            borderRadius: "10px",
                            marginRight: "6rem",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </Marquee>
      </section>
    </>
  );
}
