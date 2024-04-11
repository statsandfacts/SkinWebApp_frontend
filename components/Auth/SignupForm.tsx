'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import InputField from '../common/InputField';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Select, SelectItem } from '@nextui-org/react';

const gender = [
  { value: 'male', label: 'Male' },
  {
    value: 'female',
    label: 'Female',
  },
];

const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email_id: '',
      phone_number: '',
      password: '',
      gender: '',
      dob: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name Required'),
      last_name: Yup.string().required('Last Name Required'),
      email_id: Yup.string().required('Email Required'),
      phone_number: Yup.string().required('Phone Number Required'),
      password: Yup.string().required('Password Required'),
      dob: Yup.string().required('Date of Birth Required'),
      gender: Yup.string().required('Gender Required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          ...values,
          user_type: 'patient',
          session_id: '1234',
          government_id: '',
          government_idtype: '',
          address: '',
          qualification: '',
          specialization: '',
        };
        const data = await api.CreateUser(payload);
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
      <form
        autoComplete='off'
        className='flex flex-col gap-5 w-full max-w-md'
        onSubmit={formik.handleSubmit}>
        <InputField
          onChange={formik.handleChange}
          value={formik.values.first_name}
          type='text'
          name='first_name'
          placeholder='First Name'
          onBlur={formik.handleBlur}
          error={
            formik.errors.first_name && formik.touched.first_name
              ? formik.errors.first_name
              : null
          }
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          value={formik.values.last_name}
          type='text'
          name='last_name'
          placeholder='Last Name'
          error={
            formik.errors.last_name && formik.touched.last_name
              ? formik.errors.last_name
              : null
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          value={formik.values.email_id}
          type='text'
          name='email_id'
          placeholder='Email'
          error={
            formik.errors.email_id && formik.touched.email_id
              ? formik.errors.email_id
              : null
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          value={formik.values.phone_number}
          type='text'
          name='phone_number'
          placeholder='Phone Number'
          error={
            formik.errors.phone_number && formik.touched.phone_number
              ? formik.errors.phone_number
              : null
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
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
          value={formik.values.dob}
          type='date'
          name='dob'
          placeholder=''
          error={
            formik.errors.dob && formik.touched.dob ? formik.errors.dob : null
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />

        <Select
          placeholder='Select an gender'
          labelPlacement='outside'
          className='w-full '
          size='lg'
          radius='sm'
          onChange={formik.handleChange}
          name='gender'>
          {gender.map((g) => (
            <SelectItem key={g.value} value={g.value}>
              {g.label}
            </SelectItem>
          ))}
        </Select>

        <Button
          isLoading={isLoading}
          type='submit'
          className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
          SignUp
        </Button>
        <Link href={'/auth/login'} className='text-blue-950'>
          Already have an account? <span className='font-bold'>Login</span>
        </Link>
      </form>
    </>
  );
};

export default SignupForm;
