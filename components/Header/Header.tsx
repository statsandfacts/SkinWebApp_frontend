'use client';
import { useState } from 'react';
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

export default function Header() {
  const menuItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '/about-us',
    },
    {
      name: 'FAQ',
      link: '/coming-soon',
    },
    {
      name: 'Contact Us',
      link: '/contact-us',
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <NavbarItem isActive>
          <Link color='foreground' href='/'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about-us' color='foreground' aria-current='page'>
            About
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color='foreground' href='/coming-soon'>
            Products
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          <Link color='foreground' href='/coming-soon'>
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='/contact-us'>
            Contact us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavButton />
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
