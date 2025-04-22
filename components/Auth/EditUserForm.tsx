'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import InputField from '../common/InputField';
import { Button } from "@heroui/button";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useUser } from '@/context/UserContext';
import { Select, SelectItem } from "@heroui/react";

const gender = [
  { value: 'male', label: 'Male' },
  {
    value: 'female',
    label: 'Female',
  },
];

const EditUser = () => {
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
      first_name: userDetails?.first_name || '',
      last_name: userDetails?.last_name || '',
      email_id: userDetails?.email_id || '',
      phone_number: userDetails?.phone_number || '',
      gender: userDetails?.gender || '',
      dob: userDetails?.dob || '',
      // password: '',
      // confirmPassword: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name Required'),
      last_name: Yup.string().required('Last Name Required'),
      email_id: Yup.string().required('Email Required'),
      phone_number: Yup.string().required('Phone Number Required'),
    }),
    onSubmit: async (values) => {
      const v = { ...userDetails, ...values };

      try {
        setIsLoading(true);
        const payload = {
          ...userDetails,
          ...values,
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
      <form
        autoComplete='off'
        className='flex flex-col gap-5 w-full max-w-md'
        onSubmit={formik.handleSubmit}>
        <InputField
          disabled={true}
          isLabel={true}
          onChange={formik.handleChange}
          value={formik.values.first_name}
          type='text'
          name='first_name'
          placeholder='First Name'
          onBlur={formik.handleBlur}
          error={
            formik.errors.first_name && formik.touched.first_name
              ? formik.errors.first_name
              : ''
          }
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          disabled={true}
          value={formik.values.last_name}
          isLabel={true}
          type='text'
          name='last_name'
          placeholder='Last Name'
          error={
            formik.errors.last_name && formik.touched.last_name
              ? formik.errors.last_name
              : ''
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.email_id}
          type='text'
          name='email_id'
          placeholder='Email'
          error={
            formik.errors.email_id && formik.touched.email_id
              ? formik.errors.email_id
              : ''
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.phone_number}
          type='text'
          name='phone_number'
          placeholder='Phone Number'
          error={
            formik.errors.phone_number && formik.touched.phone_number
              ? formik.errors.phone_number
              : ''
          }
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />

        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.dob}
          type='date'
          name='dob'
          placeholder='Date of Birth'
          error={formik.errors.dob ? formik.errors.dob : ''}
          onBlur={formik.handleBlur}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />

        <Select
          labelPlacement='outside'
          aria-label='Select an gender'
          label='Select an gender'
          className='w-full '
          size='lg'
          radius='sm'
          defaultSelectedKeys={[formik.values.gender]}
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
          Update
        </Button>
      </form>
    </>
  );
};

export default EditUser;
