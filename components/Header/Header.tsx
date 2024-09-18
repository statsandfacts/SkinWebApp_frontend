'use client';
import { useMemo, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import NavButton from './NavButton';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { COMMON } from "@/config/const";
import NavButtonDP from '../DigitalPrescription/Auth/NavButton';

type MenuItem = {
  name: string;
  link: string;
};

export default function Header() {
  const pathname = usePathname();

  const menuItems: MenuItem[] = useMemo(
    () => [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about-us' },
      { name: 'FAQ', link: '/faq' },
      { name: 'Contact Us', link: '/contact-us' },
      { name: 'API Sandbox', link: '/apisandbox' },
      { name: 'Skin Care', link: '/skin-care' },
    ],
    []
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<string>('Home');

  return (
    <Navbar
      className='px-1 md:px-5'
      maxWidth='full'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          className='sm:hidden'
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
          <Link
            href='/'
            className='flex justify-center items-end text-3xl font-bold text-[#31382E] whitespace-nowrap'>
            <Image
              src='/logo.svg'
              width={50}
              height={50}
              alt='nextcare logo'
              className='w-[65px] h-auto'
            />
            <span className='text-gray-400 text-xs font-normal'>Beta</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((item) => (
          <NavbarItem 
            key={item.link}
            isActive={item.name === isActive}
            onClick={() => setIsActive(item.name)}
          >
            <Link 
              href={item.link} 
              color="foreground"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        {/* <NavbarItem>
          <Link color='foreground' href='/coming-soon'>
            Products
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify='end'>
        {
          COMMON.DIGITAL_PRESCRIPTION_ROUTES.includes(pathname) ? (
            <NavButtonDP />
          ) : ( 
            <NavButton /> 
          )
        }
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href={item.link}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
