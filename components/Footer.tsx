import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <>
            <footer className="px-16 ">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <a href="https://flowbite.com/" className="flex items-center">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
                                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LOGO</span> */}
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SkinnY Web</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">Links</h2>
                                <ul className=" text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className="hover:underline">Get Started</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className="hover:underline">Shop Product</a>
                                    </li>
                                    <li>
                                        <a href="https://tailwindcss.com/" className="hover:underline">Why Next Care</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Supports</h2>
                                <ul className=" text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Blog</a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Reviews</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase text-white">Contact US</h2>
                                <ul className="text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">+91 XXXX888888</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">contactus@gmail.com</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="flex items-center justify-center">
                        <span className="text-sm sm:text-center text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer