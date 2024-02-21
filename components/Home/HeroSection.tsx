import React from 'react'
import { Button } from "@nextui-org/react";

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <>
            <div className="w-full bg-red-200 px-10 py-5 h-screen">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col self-stretch my-auto font-bold text-zinc-800 max-md:mt-10 max-md:max-w-full">
                            <div className="text-8xl max-md:max-w-full max-md:text-4xl">
                                An unique <br />
                                approach to <br />
                                skin care
                            </div>
                            <div className="mt-5 text-md max-md:mt-5 max-md:max-w-full font-bold">
                                AI-based skin care that’s tailored to you
                            </div>

                            <Button className="justify-center w-fit py-8 mt-10 text-2xl text-center text-white bg-violet-500 rounded-full">
                                FIND YOUR TREATMENT
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                        <div className="flex relative flex-col grow max-md:mt-10 max-md:max-w-full">
                            <div className='absolute top-5 left-[-5rem] z-10'>
                                <img
                                    loading="lazy"
                                    srcSet="/images/hero1.png"
                                    className="z-10 max-w-full aspect-[0.94] w-[350px]"
                                />
                            </div>
                            <div className='absolute top-40 right-1'>
                                <img
                                    loading="lazy"
                                    srcSet="/images/hero2.svg"
                                    className="self-end max-w-full aspect-[1.1] w-[350px]"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default HeroSection