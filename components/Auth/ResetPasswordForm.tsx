'use client';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import InputField from '../common/InputField';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/redux/slices/loginModal.slice';
import Drawer from '../Drawer';
import { XMarkIcon } from '@heroicons/react/24/outline';

const LoginForm = () => {
  const { setLogin, setSession } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [verify, setVerify] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone_no: '',
    },
    validationSchema: Yup.object({
      phone_no: Yup.string()
        .required('Phone Number Required')
        .min(10, 'Phone number must be 10 digit')
        .max(10, 'Phone number must be 10 digit')
        .matches(/^\d{10}$/, 'Invalid phone number format'),
    }),
    onSubmit: async (values) => {
      setOpenModal(true);
    },
  });

  const onClose = () => {
    setOpenModal(false);
  };

  const successVerifyOtp = () => {
    setVerify(true);
    setOpenModal(false);
  };

  return (
    <>
      <form
        autoComplete='off'
        className='flex flex-col gap-5 w-full max-w-md px-5'
        onSubmit={formik.handleSubmit}>
        <InputField
          onChange={formik.handleChange}
          value={formik.values.phone_no}
          type='text'
          name='phone_no'
          placeholder='Email or Phone Number'
          onBlur={formik.handleBlur}
          error={
            formik.errors.phone_no && formik.touched.phone_no
              ? formik.errors.phone_no
              : ''
          }
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />

        <Button
          isLoading={isLoading}
          type='submit'
          className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
          Reset
        </Button>
      </form>

      <OTPModal
        openModal={openModal}
        onClose={onClose}
        phone={formik.values.phone_no}
        successVerifyOtp={successVerifyOtp}
      />
    </>
  );
};

/**
 * Otp components
 * @param param0
 * @returns
 */

const OTPModal = ({ openModal, onClose, phone, successVerifyOtp }: any) => {
  const [isSendOtp, setIsSetOtp] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    const sendOtp = async () => {
      setIsSetOtp(true);
      setIsOtpLoading(true);
      const response = await api.generateOtp({
        phone_number: phone,
      });

      if (response && response.status === 200) {
        toast.success('OTP Send Successfully');
        setOtp(response.verification_code);
        setIsOtpLoading(false);
      } else {
        toast.error('Some error occurred');
        setIsOtpLoading(false);
      }
    };

    if (openModal) {
      sendOtp();
    }
  }, [openModal]);

  const handleClose = () => {
    setIsSetOtp(false);
    setIsOtpLoading(false);
    setIsVerify(false);
    onClose();
  };

  /**
   * Otp Form
   */
  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required('Enter Valid OTP')
      .length(6, 'Must be exactly 6 digits')
      .matches(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
  });
  const OTPForm = () => (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={otpSchema}
      onSubmit={(values) => {
        if (values.otp) {
          setIsVerify(true);
          toast.success('OTP Verified Successfully');
        } else {
          toast.error('Invalid OTP');
        }
      }}>
      {() => (
        <Form>
          <div className='mb-3'>
            <Field
              name='otp'
              type='text'
              placeholder='Enter otp'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <ErrorMessage
              className='text-sm text-red-500'
              name='otp'
              component='div'
            />
          </div>
          <Button
            isLoading={isOtpLoading}
            type='submit'
            className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
            Verify
          </Button>
        </Form>
      )}
    </Formik>
  );

  /**
   * Password Form
   */
  const passwordSchema = Yup.object().shape({
    password: Yup.string().required('Password Required'),
    confirmPassword: Yup.string()
      .required('Confirm Password Required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const PasswordForm = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={passwordSchema}
      onSubmit={(values) => {
        // handle form submission
        console.log('Password Form Values:', values);
      }}>
      {() => (
        <Form className='flex flex-col gap-3'>
          <div>
            <label>Password</label>
            <Field
              name='password'
              type='text'
              placeholder='Enter password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <ErrorMessage
              className='text-sm text-red-500'
              name='password'
              component='div'
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field
              name='confirmPassword'
              type='password'
              placeholder='Confirm password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <ErrorMessage
              className='text-sm text-red-500'
              name='confirmPassword'
              component='div'
            />
          </div>
          <Button
            isLoading={isOtpLoading}
            type='submit'
            className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <>
      <Modal isOpen={openModal} hideCloseButton={true}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <div className='flex w-full'>
                {!isVerify ? (
                  <div>Verify Your OTP</div>
                ) : (
                  <div>Reset Password</div>
                )}
              </div>
              <button
                className='absolute right-4 top-4 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-100'
                onClick={handleClose}>
                <XMarkIcon className='w-5 h-5 text-gray-500' />
              </button>
            </ModalHeader>
            <ModalBody>{isVerify ? PasswordForm() : OTPForm()}</ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginForm;
