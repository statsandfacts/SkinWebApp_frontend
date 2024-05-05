'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/button';
import InputField from '../common/InputField';

const ChangePasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user: userId, userSession: sessionId } = useUser();

  const { data: userDetails } = useSWR(
    userId ? ['/user/getUser', userId] : null,
    () => api.getUser(userId)
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password Required'),
      confirmPassword: Yup.string()
        .required('Confirm Password Required')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          ...values,
          user_type: 'patient',
          session_id: sessionId,
          government_id: '',
          government_idtype: '',
          address: '',
          qualification: '',
          specialization: '',
          user_id: userDetails?.user_id || '',
        };
        const { ...userPayload } = payload;
        const data = await api.EditUser(userPayload);
        if (data && data.status === 200) {
          toast.success('User created successfully');
          router.back();
        } else {
          toast.error('Something went wrong');
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.detail);
        } else {
          toast.error('Something went wrong');
        }
      }
    },
  });
  return (
    <>
      <>
        <form
          autoComplete='off'
          className='flex flex-col gap-5 w-full max-w-md'
          onSubmit={formik.handleSubmit}>
          <InputField
            onChange={formik.handleChange}
            value={formik.values.password}
            type='password'
            name='password'
            placeholder='Password'
            error={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            onBlur={formik.handleBlur}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <InputField
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
            onBlur={formik.handleBlur}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <Button
            isLoading={isLoading}
            type='submit'
            className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
            Update
          </Button>
        </form>
      </>
    </>
  );
};

export default ChangePasswordForm;
