'use client';

import { useUser } from '@/context/UserContext';
import { getLocalStorage } from '@/utils/localStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export interface ProvidersProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: ProvidersProps) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const a = getLocalStorage('isLoggedIn');
    if (!isLoggedIn && !a) {
      toast.error('Please login first');
      router.replace('/');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthProvider;
