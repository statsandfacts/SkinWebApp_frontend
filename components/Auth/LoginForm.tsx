'use client';
import { Button, Checkbox } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import InputField from '../common/InputField';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/redux/slices/loginModal.slice';

const LoginForm = () => {
  const { setLogin, setSession } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
          dispatch(setLoginModal(false));
          router.replace('/');
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
      <form
        autoComplete='off'
        className='flex flex-col gap-5 w-full max-w-md px-5'
        onSubmit={formik.handleSubmit}>
        <InputField
          onChange={formik.handleChange}
          value={formik.values.email_or_phone_no}
          type='text'
          name='email_or_phone_no'
          placeholder='Email or Phone Number'
          onBlur={formik.handleBlur}
          error={
            formik.errors.email_or_phone_no && formik.touched.email_or_phone_no
              ? formik.errors.email_or_phone_no
              : ''
          }
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
          <Link
            href={'/auth/signup'}
            className='text-blue-950 font-semibold text-sm'>
            Don&apos;t have an account?{' '}
            <span className='font-bold'>Create Account</span>
          </Link>
        </div>

        <Button
          isLoading={isLoading}
          type='submit'
          className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
          Login
        </Button>
      </form>
      {/* <div className='flex flex-col gap-5 w-full max-w-md '>
        <div className='flex items-center justify-center'>
          <hr className='w-full border-1 border-gray-400' />
          <span className='text-sm font-medium text-black p-2'>OR</span>
          <hr className='w-full border-1 border-gray-400' />
        </div>
        <div className='flex justify-center'>
          <Button className='w-10 h-10 '>Google</Button>
        </div>
      </div> */}
    </>
  );
};

export default LoginForm;
