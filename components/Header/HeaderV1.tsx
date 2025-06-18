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
} from "@heroui/navbar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import ProfileHeaderButton from "./ProfileHeaderButton";

type MenuItem = {
  name: string;
  link: string;
};

export default function HeaderV1() {
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
      { name: "ABDM", link: "/ayushman-bharat" },
      { name: "HealthFeed", link: "/blog" },
      { name: "Meds&Lab", link: "/med-lab" },
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
        className={`px-1 md:px-5 transition-shadow h-16 bg-primary-lite ${
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
              <span className="text-secondary-lite text-xs font-normal mb-1">
                Beta
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarContent className="hidden sm:flex gap-4">
            {isUserReady && userId && (
              <NavbarItem
                key={"/dashboard"}
                isActive={"/dashboard" === pathname}
              >
                <Link
                  href={"/dashboard"}
                  color="foreground"
                  className={
                    "/dashboard" === pathname ? "text-primary" : "text-white"
                  }
                >
                  {"Dashboard"}
                </Link>
              </NavbarItem>
            )}

            {menuItems.map((item) => (
              <NavbarItem key={item.link} isActive={item.link === pathname}>
                <Link
                  href={item.link}
                  className={
                    item.link === pathname ? "text-primary" : "text-white"
                  }
                >
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="end">
          <ProfileHeaderButton />
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
        </NavbarMenu>
      </Navbar>
    </>
  );
}
