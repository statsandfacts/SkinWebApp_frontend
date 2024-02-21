
const links = [
	{
		to: "/#features",
		label: "Features",
	},
	{
		to: "/#solution",
		label: "Solution",
	},
	{
		to: "/#reviews",
		label: "Reviews",
	},
];
export const Navbar = () => {

	return (
		<>
			<header className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 border-b border-divider backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-red-200/90">
				<nav className="w-full bg-transparent">
					<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
						<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
							<div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
								<a href="/#home" aria-label="logo" className="flex items-center space-x-2">
									<div aria-hidden="true" className="flex space-x-1">
										<div className="h-4 w-4 rounded-full bg-black"></div>
										<div className="h-6 w-2 bg-primary"></div>
									</div>
									<span className="text-2xl font-bold text-black">SkinWeb</span>
								</a>

								<div className="relative flex max-h-10 items-center lg:hidden">
									<button aria-label="humburger" id="hamburger" className="relative -mr-6 p-6">
										<div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
										<div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
									</button>
								</div>
							</div>
							<div id="navLayer" aria-hidden="true" className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"></div>
							<div id="navlinks" className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none">
								<div className="w-full text-black lg:w-auto lg:pr-4 lg:pt-0">
									<ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
										{
											links.map((link) => (
												<li key={link.label}>
													<a href={link.to} className="hover:text-primary block transition dark:hover:text-white md:px-4">
														<span>{link.label}</span>
													</a>
												</li>
											))
										}

									</ul>
								</div>

								<div className="mt-12 lg:mt-0">
									<a href="/register" className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-violet-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
										<span className="relative text-sm font-semibold text-white">Signup</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};
