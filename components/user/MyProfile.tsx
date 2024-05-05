'use client';
import { useUser } from '@/context/UserContext';
import {
  ArrowRightEndOnRectangleIcon,
  BellAlertIcon,
  CalendarIcon,
  ChevronRightIcon,
  CubeIcon,
  DocumentTextIcon,
  GiftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { user: userId, setLogout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    if (userId) {
      router.replace('/login');
      toast.success('Logout successfully');
      setLogout();
    }
  };
  return (
    <>
      <div className='flex flex-col w-full justify-start items-start self-stretch md:rounded-xl  md:overflow-hidden'>
        {/* Menu */}
        <div className='flex flex-col justify-start items-start self-stretch gap-3 px-6 pb-6'>
          <div className='flex flex-col justify-start items-start self-stretch'>
            <div className='flex flex-col justify-start items-start self-stretch pt-2'>
              <div className='flex flex-col justify-start items-start self-stretch relative gap-1 pt-4 pb-1'>
                <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-black/[0.64]'>
                  Your Consultation
                </p>
              </div>
              <Link
                href='/user/sessions'
                className={clsx(
                  'flex justify-between items-center self-stretch relative py-3  ',
                  pathname.startsWith('/user/sessions') && 'text-red-500 '
                )}>
                <div className='flex justify-start items-center relative gap-2'>
                  <UserIcon className='w-7 md:w-5 h-7 md:h-5' />
                  <p className='flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize '>
                    Your Sessions
                  </p>
                </div>
              </Link>
              {/* <Link
                href='/user/upcoming'
                className='flex justify-between items-center self-stretch relative py-3  '>
                <div className='flex justify-start items-center relative gap-2'>
                  <MapPinIcon className='w-7 md:w-5 h-7 md:h-5' />
                  <p className='flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize '>
                    Upcoming Sessions
                  </p>
                </div>
              </Link> */}
            </div>
            <div className='flex flex-col justify-start items-start self-stretch pt-2'>
              <div className='flex flex-col justify-start items-start self-stretch relative gap-1 pt-4 pb-1'>
                <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-black/[0.64]'>
                  My Profile
                </p>
              </div>
              <Link
                href='/user/edit-user'
                className={clsx(
                  'flex justify-between items-center self-stretch relative py-3  ',
                  pathname === '/user/edit-user' && 'text-red-500 '
                )}>
                <div className='flex justify-start items-center relative gap-2'>
                  <DocumentTextIcon className='w-7 md:w-5 h-7 md:h-5 ' />
                  <p className='flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize '>
                    Edit Profile
                  </p>
                </div>
              </Link>
              <Link
                href='/user/change-password'
                className='flex justify-between items-center self-stretch relative py-3'>
                <div className='flex justify-start items-center relative gap-2'>
                  <QuestionMarkCircleIcon className='w-7 md:w-5 h-7 md:h-5' />
                  <p className='flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize '>
                    Change Password
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className='flex justify-center items-center w-full h-12 md:h-auto gap-2 px-6 py-3 md:py-2 rounded-2xl md:rounded-xl bg-black/[0.04] border-[1.33px] '>
            <ArrowRightEndOnRectangleIcon className='w-7 md:w-5 h-7 md:h-5 ' />
            <div className=' text-sm md:text-xs font-medium capitalize'>
              Logout
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
