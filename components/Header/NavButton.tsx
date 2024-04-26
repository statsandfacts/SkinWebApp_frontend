'use client';
import { useUser } from '@/context/UserContext';
import { Button } from '@nextui-org/button';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { UserTwitterCard } from './UserCard';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import Link from 'next/link';
import { toast } from 'react-toastify';

const NavButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user: userId, userDetailsSet, setLogout } = useUser();

  const {
    data: userDetails,
    isLoading,
    error,
  } = useSWR(userId ? ['/user/getUser', userId] : null, () =>
    api.getUser(userId)
  );
  const handleLoginClick = (route: String) => {
    router.push('/auth/' + route);
  };

  const handleLogout = () => {
    toast.success('Logout successfully');
    setLogout();
  };

  useEffect(() => {
    if (userDetails) {
      userDetailsSet(userDetails);
    }
  }, [userDetails, userDetailsSet]);

  const loginJSX = (
    <Button
      onClick={(e) => handleLoginClick('login')}
      className='grow justify-center px-5 py-2.5 text-violet-600 border-2 border-violet-600 border-solid rounded-full bg-white'>
      Login
    </Button>
  );

  const profileElement = (
    <Link href='/user/sessions'>
      <User
        as='button'
        name={userDetails?.first_name}
        description={userDetails?.email_id}
        className='transition-transform'
        avatarProps={{
          name: userDetails?.first_name,
        }}
      />
    </Link>
  );

  const mobileProfileElement = (
    <>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='secondary'
            name='Jason Hughes'
            size='sm'
            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{userDetails?.first_name}</p>
          </DropdownItem>
          <DropdownItem key='settings'>
            <Link href='/user/sessions'>View Case</Link>
          </DropdownItem>
          <DropdownItem key='configurations'>
            <Link href='/user/edit-user'>Edit User</Link>
          </DropdownItem>
          <DropdownItem key='help_and_feedback'>Change Password</DropdownItem>
          <DropdownItem key='logout' color='danger' onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );

  const renderButton = () => {
    if (userId) {
      return (
        <>
          <div className='hidden md:block'>{profileElement}</div>
          <div className='md:hidden'>{mobileProfileElement}</div>
        </>
      );
    } else {
      return <div className='flex sm:mr-10'>{loginJSX}</div>;
    }
  };

  return (
    <>
      <div className='flex gap-2 justify-center whitespace-nowrap sm:flex-col sm:justify-start sm:gap-0'>
        {isLoading ? <span>loading...</span> : renderButton()}
      </div>
    </>
  );
};

export default NavButton;
