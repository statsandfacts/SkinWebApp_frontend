'use client';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useFormik } from 'formik';
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
      email_or_phone_no: '',
    },
    validationSchema: Yup.object({
      email_or_phone_no: Yup.string().required('Email or phone is required'),
    }),
    onSubmit: async (values) => {
      setOpenModal(true);
      //   try {
      //     setIsLoading(true);
      //     const payload = {
      //       ...values,
      //       user_role: '1',
      //       session_id: new Date().getTime().toString(),
      //     };
      //     const data = await api.login(payload);
      //     if (data && data.status === 200) {
      //       toast.success('Login successful');
      //       const userId = data.user_id;
      //       setLogin(userId);
      //       setSession(payload.session_id);
      //       dispatch(setLoginModal(false));
      //       router.replace('/');
      //     } else {
      //       toast.success('Login failed');
      //     }
      //     setIsLoading(false);
      //   } catch (error: any) {
      //     console.log(error);
      //     setIsLoading(false);
      //     if (error.response?.status === 409) {
      //       toast.error('Invalid credentials');
      //     } else {
      //       toast.error('Something went wrong');
      //     }
      //   }
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
        email={formik.values.email_or_phone_no}
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

const OTPModal = ({
  openModal,
  onClose,
  emailOrPhone,
  successVerifyOtp,
}: any) => {
  const [isSendOtp, setIsSetOtp] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    const sendOtp = async () => {
      setIsSetOtp(true);
      setIsOtpLoading(true);
      const response = await api.generateOtp({
        email_id: emailOrPhone,
        phone_number: emailOrPhone,
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

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('Enter Valid OTP')
        .length(6)
        .matches(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
    }),
    onSubmit: async (values) => {
      try {
        if (values.otp) {
          //   successVerifyOtp();
          setIsVerify(true);
          toast.success('OTP Verified Successfully');
        } else {
          toast.error('Invalid OTP');
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClose = () => {
    setIsSetOtp(false);
    setIsOtpLoading(false);
    setIsVerify(false);
    // reset formik
    formik.resetForm({
      values: {
        otp: '',
      },
    });
    onClose();
  };

  const passwordResetInputBox = (
    <>
      <InputField
        onChange={() => {}}
        value={''}
        type='text'
        name='password'
        placeholder='Enter New Password'
        error={formik.errors.otp && formik.touched.otp ? formik.errors.otp : ''}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
    p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      <InputField
        onChange={() => {}}
        value={''}
        type='text'
        name='password'
        placeholder='Confirm New Password'
        error={formik.errors.otp && formik.touched.otp ? formik.errors.otp : ''}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
    p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      <Button
        isLoading={isOtpLoading}
        type='submit'
        className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
        Reset
      </Button>
    </>
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
            <ModalBody>
              {isVerify ? (
                passwordResetInputBox
              ) : (
                <>
                  <div>
                    <InputField
                      onChange={formik.handleChange}
                      isLabel={true}
                      value={formik.values.otp}
                      type='otp'
                      name='otp'
                      placeholder='Enter your Otp'
                      error={formik.errors.otp ? formik.errors.otp : ''}
                      onBlur={formik.handleBlur}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                  </div>
                  {/* <Button
                    isLoading={isOtpLoading}
                    color='primary'
                    onClick={(e: any) => {
                      formik.handleSubmit();
                    }}>
                    Verify
                  </Button> */}
                  <Button
                    isLoading={isOtpLoading}
                    onClick={(e: any) => {
                      formik.handleSubmit();
                    }}
                    type='submit'
                    className='p-6 w-full text-white bg-violet-600 rounded-[96.709px]'>
                    Verify
                  </Button>
                </>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginForm;
