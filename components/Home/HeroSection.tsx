import React from "react";
import Image from "next/image";
import ClientButton from "../ClientButton";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <>
      <div className="px:1 md:px-20 bg-gradient-to-r from-[#9DEAF4]  to-[#F0936C] py-16 w-full h-screen ">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col px-14 text-center max-md:px-5 max-md:max-w-full">
                <div className="text-6xl font-bold text-purple-900 uppercase leading-[64px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
                  A unique approach to skin care
                </div>
                <div className="self-center mt-4 text-3xl text-white font-semibold">
                  Prescription based
                  <span className="font-bold text-[#ff7043] uppercase">
                    {" "}
                    Skincare{" "}
                  </span>
                  at your fingertips
                </div>
              </div>
              <ClientButton
                path="/treatment"
                title="Find Your Treatment"
                className="justify-center self-center px-8 py-6 mt-8 text-lg font-medium text-white whitespace-nowrap bg-violet-600 shadow rounded-[96.709px] max-md:px-5"
              />
            </div>
          </div>
          <div className="hidden md:flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full relative">
                  <Image
                    loading="lazy"
                    src="/images/banner2.jpg"
                    className="grow self-stretch object-cover object-center w-full shadow aspect-[0.81] max-md:mt-4 rounded-t-full"
                    fill
                    alt="banner image"
                  />
                </div>
                <div className="flex mt-20 flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full relative">
                  <Image
                    loading="lazy"
                    src="/images/banner.png"
                    className="grow w-full object-cover shadow aspect-[0.73] max-md:mt-10 rounded-t-full "
                    alt="banner image"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
