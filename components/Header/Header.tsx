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
import clsx from 'clsx';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

export default function Header() {
  const menuItems = ['Home', 'About', 'Product', 'Faq', 'Contact us'];
  return (
    <Navbar className='px-1 md:px-5' maxWidth='full'>
      <NavbarContent>
        <NavbarBrand>
          <Link
            href='/'
            className='flex justify-center items-end text-3xl font-bold text-[#31382E] whitespace-nowrap'>
            {/* NEXT<span className='text-green-500'>.</span>CARE */}
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
        <NavbarItem>
          <Link color='foreground' href='/coming-soon'>
            Products
          </Link>
        </NavbarItem>
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
      {/* <NavbarMenu className='flex flex-col text-center gap-2'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className='flex justify-center gap-2'>
            <Link
              color={index === 0 ? 'primary' : 'foreground'}
              className={clsx(
                index === 0 ? 'text-blue-500' : 'text-black',
                'transition-colors duration-200 hover:text-black'
              )}
              href='/'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}
