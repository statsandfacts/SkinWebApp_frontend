import { HeroSection, OurClients, Partners, Section2, Section3 } from "@/components/Home/index";

export default function Home() {
	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-col items-center w-full max-md:max-w-full">
					<HeroSection />
					<Section2 />
					<Section3 />
					<Partners />
					<OurClients />


				</div>
				{/* <div className="flex flex-col px-16 mt-20 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
					<div className="flex flex-col max-w-full w-[419px]">
						<div>
							<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
								<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
									<div className="flex flex-col grow text-center text-black whitespace-nowrap max-md:mt-1">
										<div className="flex overflow-hidden relative flex-col self-center pb-12 w-52 text-lg aspect-[0.82]">
											<img
												loading="lazy"
												srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b25d6b7be86dee8b87a7819c258c48d23fe62abd5d2e208803d75f2f5f69f5dd?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
												className="object-cover absolute inset-0 size-full"
											/>
											<div className="relative justify-center px-3.5 py-1.5 mb-32 rounded-none bg-zinc-300 max-md:pr-5 max-md:mb-10">
												Before
											</div>
										</div>
										<div className="self-start mt-6 ml-14 text-2xl max-md:ml-2.5">
											“
										</div>
									</div>
								</div>
								<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
									<img
										loading="lazy"
										srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/660b1ff2d2f8a4c98531710ad3f231c6eaa351d4e9471316a862aea118bb55ac?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
										className="flex-1 shrink-0 w-full aspect-[0.82]"
									/>
								</div>
							</div>
						</div>
						<div className="self-center text-2xl text-center text-black whitespace-nowrap">
							I recommend to everyone!!
						</div>
					</div>
					<div className="z-10 self-end mt-0 max-w-full w-[870px] max-md:mt-0">
						<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
							<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
								<div className="grow max-md:mt-8">
									<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
										<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
											<div className="flex overflow-hidden relative flex-col flex-1 grow pb-12 text-lg text-center text-black whitespace-nowrap aspect-[0.82] max-md:mt-1">
												<img
													loading="lazy"
													srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3462a079c2b0d6c7507f99546d240ad2c84df6b943611cdd2f40137aa4a50703?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
													className="object-cover absolute inset-0 size-full"
												/>
												<div className="relative justify-center px-3.5 py-1.5 rounded-none bg-zinc-300 max-md:pr-5">
													Before
												</div>
											</div>
										</div>
										<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
											<div className="flex overflow-hidden relative flex-col flex-1 grow pb-12 text-lg text-center text-black whitespace-nowrap aspect-[0.82] max-md:mt-1.5">
												<img
													loading="lazy"
													srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2287bc22fad034d4e4b3f4ce4f04dfe7475b8ec0f1f7b2097877afdba7550844?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
													className="object-cover absolute inset-0 size-full"
												/>
												<div className="relative justify-center px-3 py-1.5 rounded-none bg-zinc-300">
													After
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
								<div className="grow max-md:mt-8">
									<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
										<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
											<div className="flex overflow-hidden relative flex-col flex-1 grow pb-12 text-lg text-center text-black whitespace-nowrap aspect-[0.82]">
												<img
													loading="lazy"
													srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8d3ba9fccb2e75df2e76dfffe184feec540ce180941823d673d36a577258014?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
													className="object-cover absolute inset-0 size-full"
												/>
												<div className="relative justify-center px-3 py-1.5 rounded-none bg-zinc-300 max-md:pr-5">
													Before
												</div>
											</div>
										</div>
										<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
											<div className="flex overflow-hidden relative flex-col flex-1 grow pb-12 text-lg text-center text-black whitespace-nowrap aspect-[0.82]">
												<img
													loading="lazy"
													srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8ca9cc0cdfca7d126582bc76bda8b99685b582a677d8ed5f973100025ab6195b?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
													className="object-cover absolute inset-0 size-full"
												/>
												<div className="relative justify-center px-3 py-1.5 rounded-none bg-zinc-300">
													After
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="z-10 self-end mt-6 mr-96 text-2xl text-center text-black max-md:mr-2.5">
						“
					</div>
					<div className="self-center mt-0 text-2xl text-center text-black">
						“
					</div>
					<div className="z-10 self-end mr-11 text-2xl text-center text-black whitespace-nowrap max-md:mr-2.5">
						My Confidence came back 10 fold
					</div>
					<div className="self-center -mt-5 text-2xl text-center text-black whitespace-nowrap">
						My skin has never looked better
					</div>
				</div>
				<div className="px-16 py-8 mt-24 w-full bg-zinc-800 max-md:px-5 max-md:mt-10 max-md:max-w-full">
					<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
						<div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
							<div className="flex flex-col self-stretch my-auto max-md:mt-10">
								<div className="text-5xl font-bold text-green-500 whitespace-nowrap">
									NEXT<span className="text-green-500">.</span>CARE
								</div>
								<div className="mt-20 text-7xl text-white max-md:mt-10 max-md:text-4xl">
									Contact
									<br />& Media
								</div>
							</div>
						</div>
						<div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
							<div className="flex grow gap-5 justify-between text-2xl text-white max-md:mt-10">
								<div className="flex flex-col flex-1 px-5 py-8 bg-violet-500 bg-opacity-10 max-md:pr-5">
									<div>Get Started</div>
									<div className="mt-8 whitespace-nowrap">Shop Products</div>
									<div className="mt-7 whitespace-nowrap">Why Next.Care</div>
									<div className="mt-7 whitespace-nowrap">How it Works</div>
									<div className="mt-8">Our Story</div>
								</div>
								<div className="flex flex-col flex-1 px-5 py-8 whitespace-nowrap bg-violet-500 bg-opacity-10 max-md:pr-5">
									<div>Support</div>
									<div className="mt-7">Blog</div>
									<div className="mt-7">Reviews</div>
									<div className="mt-8">Careers</div>
									<div className="mt-8">Contact Us</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
							<div className="flex flex-col grow mt-14 text-2xl text-white max-md:mt-10 max-md:max-w-full">
								<div className="flex gap-5 justify-between self-start ml-3.5 max-md:ml-2.5">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/be97ea13882946e44dd177886ddf37ee1706afd910e6d489204bfe4fe2f40e84?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
										className="aspect-square fill-white w-[25px]"
									/>
									<div className="flex-auto my-auto">+91 91244 26966</div>
								</div>
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb5f3ec62c7113ce39cbf26a7cb5ca50cdf9ba5be19b305508185ef2efde1448?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
									className="mt-6 w-full stroke-[1px] stroke-zinc-500 max-md:max-w-full"
								/>
								<div className="flex gap-5 justify-between self-start mt-7 ml-3.5 whitespace-nowrap max-md:ml-2.5">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/11c5b43c55e30e5bf6959a4f8d6c72c6620202dd21f374be195a6ff57e98a130?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
										className="self-start aspect-[1.37] w-[22px]"
									/>
									<div className="flex-auto">contact@statsandfacts.in</div>
								</div>
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb5f3ec62c7113ce39cbf26a7cb5ca50cdf9ba5be19b305508185ef2efde1448?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
									className="mt-6 w-full stroke-[1px] stroke-zinc-500 max-md:max-w-full"
								/>
								<div className="flex gap-5 justify-between px-8 py-3 mt-14 text-base whitespace-nowrap bg-violet-500 bg-opacity-10 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
									<div className="grow self-start mt-2">Follow @next.care</div>
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab933e2a792a303c87b082b83986dcc4b9bcb938d188b80dbaf60f23a0b35fbe?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
										className="aspect-[10] w-[245px]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</>
	);
}


import * as React from "react";



