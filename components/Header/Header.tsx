"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import NavButton from "./NavButton";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMMON } from "@/config/const";
import NavButtonDP from "../DigitalPrescription/Auth/NavButton";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import SearchMedicine from "./SearchMedicine";
import LabInvestigationNavItem from "./LabInvestigationNavItem";

type MenuItem = {
  name: string;
  link: string;
};

export default function Header() {
  const pathname = usePathname();
  const { userId } = useAuthInfo();

  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    setIsUserReady(true);
  }, []);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { name: "Home", link: "/" },
      { name: "About", link: "/about-us" },
      { name: "FAQ", link: "/faq" },
      // { name: "Contact Us", link: "/contact-us" },
      { name: "ABDM", link: "/ayushman-bharat" },
      { name: "Health Feed", link: "/blog" },
      { name: "Meds&Lab", link: "/med-lab" },
      // { name: 'API Sandbox', link: '/apisandbox' },
      // { name: 'Skin Care', link: '/skin-care' },
    ],
    []
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        className={`px-1 md:px-5 transition-shadow ${
          isScrolled ? "shadow-xl" : ""
        }`}
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <Link
              href="/"
              className="flex justify-center items-end text-3xl font-bold text-[#31382E] whitespace-nowrap"
            >
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="nextcare logo"
                className="w-[65px] h-auto"
              />
              <span className="text-gray-400 text-xs font-normal">Beta</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {isUserReady && userId ? (
            <NavbarItem key={"/dashboard"} isActive={"/dashboard" === pathname}>
              <Link
                href={"/dashboard"}
                color="foreground"
                className={
                  "/dashboard" === pathname ? "text-sky-700" : "text-black"
                }
              >
                {"Dashboard"}
              </Link>
            </NavbarItem>
          ) : null}

          {menuItems.map((item) => (
            <NavbarItem key={item.link} isActive={item.link === pathname}>
              <Link
                href={item.link}
                className={
                  item.link === pathname ? "text-sky-700" : "text-black"
                }
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          {/* {pathname === "/" && ( */}
          {/* <LabInvestigationNavItem /> */}
          {/* )} */}

          {/* <NavbarItem>
          <Link color='foreground' href='/coming-soon'>
            Products
          </Link>
        </NavbarItem> */}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavButtonDP />
          {/* {
          COMMON.DIGITAL_PRESCRIPTION_ROUTES.includes(pathname) ? (
            <NavButtonDP />
          ) : ( 
            <NavButton /> 
          )
        } */}
        </NavbarContent>

        <NavbarMenu>
          {isUserReady && userId && (
            <NavbarMenuItem>
              <Link
                href={"/dashboard"}
                color="foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Dashboard
              </Link>
            </NavbarMenuItem>
          )}
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.link}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {/* {pathname === "/" && ( */}
          {/* <LabInvestigationNavItem
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          /> */}
          {/* )} */}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
