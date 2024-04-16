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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: userId } = useUser();

  const menuItems = ['Home', 'About', 'Products', 'FAQ', 'Contact US', 'Login'];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='px-5' maxWidth='full'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link
            href='/'
            className='grow my-auto text-3xl font-bold text-[#31382E] whitespace-nowrap'>
            NEXT<span className='text-green-500'>.</span>CARE
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
          <Link href='#' color='foreground' aria-current='page'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Contact us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavButton />
      </NavbarContent>
      <NavbarMenu className='flex flex-col text-center gap-2'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className='flex justify-center gap-2'>
            {item === 'Login' ? (
              <>
                {!userId ? (
                  <Link
                    href='/auth/login'
                    className='mt-4 w-48 bg-violet-500 justify-center px-5 py-2 text-white border-2 border-violet-600 border-solid rounded-full '>
                    {item}
                  </Link>
                ) : (
                  <Link
                    href='/user/myprofile'
                    className='mt-4 w-48  justify-center px-5 py-2 text-black border-2 border-violet-600 border-solid rounded-full '>
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link
                color={index === 0 ? 'primary' : 'foreground'}
                className={clsx(
                  index === 0 ? 'text-blue-500' : 'text-black',
                  'transition-colors duration-200 hover:text-black'
                )}
                href='/'>
                {item}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
