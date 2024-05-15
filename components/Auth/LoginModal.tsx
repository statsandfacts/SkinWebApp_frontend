import React, { useState } from 'react';
import Drawer from '../Drawer';
import InputField from '../common/InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/redux/slices/loginModal.slice';
const LoginModal = () => {
  const { setLogin, setSession } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const disptach = useDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email_or_phone_no: '',
      password: '',
    },
    validationSchema: Yup.object({
      email_or_phone_no: Yup.string().required('Email or phone is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          ...values,
          user_role: '1',
          session_id: new Date().getTime().toString(),
        };
        const data = await api.login(payload);

        if (data && data.status === 200) {
          toast.success('Login successful');
          const userId = data.user_id;
          setLogin(userId);
          setSession(payload.session_id);
          disptach(setLoginModal(false));
        } else {
          toast.success('Login failed');
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        if (error.response?.status === 409) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Something went wrong');
        }
      }
    },
  });
  return (
    <>
      <Drawer title='Sign-in to Next.care'>
        <div className='flex flex-col gap-5 mt-5 w-full'>
          <InputField
            onChange={formik.handleChange}
            value={formik.values.email_or_phone_no}
            type='text'
            name='email_or_phone_no'
            placeholder='Email or Phone Number'
            onBlur={formik.handleBlur}
            error={
              formik.errors.email_or_phone_no &&
              formik.touched.email_or_phone_no
                ? formik.errors.email_or_phone_no
                : ''
            }
            className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <InputField
            onChange={formik.handleChange}
            value={formik.values.password}
            type='password'
            name='password'
            placeholder='Password'
            onBlur={formik.handleBlur}
            error={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ''
            }
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <div className='flex justify-between items-center gap-5'>
            <Link href={'/auth/signup'} className='text-blue-950 '>
              Don&apos;t have an account?{' '}
              <span className='font-bold'>Create Account</span>
            </Link>
          </div>

          <Button
            isLoading={isLoading}
            onClick={(e) => {
              formik.handleSubmit();
            }}
            className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
            Login
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default LoginModal;
