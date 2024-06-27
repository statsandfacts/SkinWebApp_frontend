'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '@/services/app.service';
import InputField from '../common/InputField';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/context/UserContext';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/redux/slices/loginModal.slice';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [verify, setVerify] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setLogin, setSession } = useUser();
  const disptach = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email_id: '',
      phone_number: '',
      gender: '',
      dob: '',
      password: '',
      confirmPassword: '',
    },
    // validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      ...(currentStep === 1 && {
        first_name: Yup.string()
          .required('First Name Required')
          .matches(/^[a-zA-Z]+$/, 'Special characters are not allowed'),
        last_name: Yup.string()
          .required('Last Name Required')
          .matches(/^[a-zA-Z]+$/, 'Special characters are not allowed'),
      }),
      ...(currentStep === 2 && {
        email_id: Yup.string().email().required('Email Required'),
        phone_number: Yup.string()
          .required('Phone Number Required')
          .min(10, 'Phone number must be 10 digit')
          .max(10, 'Phone number must be 10 digit')
          .matches(/^\d{10}$/, 'Invalid phone number format'),
      }),
      ...(currentStep === 3 && {
        gender: Yup.string().required('Gender Required'),
        dob: Yup.date().required('Date of Birth Required'),
      }),
      ...(currentStep === 4 && {
        password: Yup.string().required('Password Required'),
        confirmPassword: Yup.string()
          .required('Confirm Password Required')
          .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
      }),
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
          zipcode: '',
          govt_id_image: '',
          city: '',
          state: '',
        };
        const data = await api.CreateUser(payload);
        if (data && data.status === 200) {
          const userId = data?.user_id;
          setLogin(userId);
          disptach(setLoginModal(false));
          toast.success('User created successfully');

          // call login APi
          const loginPayload = {
            email_or_phone_no: values.email_id,
            password: values.password,
            user_role: '1',
            session_id: new Date().getTime().toString(),
          };
          const res = await api.login(loginPayload);
          if (res && res.status === 200) {
            setSession(loginPayload.session_id);
          }
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

  // Render Step form

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputField
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.first_name}
              type='text'
              name='first_name'
              placeholder='First Name'
              error={formik.errors.first_name ? formik.errors.first_name : ''}
              onBlur={formik.handleBlur}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <InputField
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.last_name}
              type='text'
              name='last_name'
              placeholder='Last Name'
              error={formik.errors.last_name ? formik.errors.last_name : ''}
              onBlur={formik.handleBlur}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />

            <Checkbox defaultSelected>
              <div className='text-sm '>
                By Creating an account i agree to the{' '}
                <a
                  href='/policy/terms-and-condition'
                  className='font-semibold hover:underline'>
                  Terms and Condition
                </a>{' '}
                ,{' '}
                <a href='/policy' className='font-semibold hover:underline'>
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href='/policy/refund-cancellation'
                  className='font-semibold hover:underline'>
                  Refund Policy
                </a>
                .
              </div>
            </Checkbox>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <InputField
                onChange={formik.handleChange}
                isLabel={true}
                value={formik.values.email_id}
                type='text'
                name='email_id'
                placeholder='Email'
                error={formik.errors.email_id ? formik.errors.email_id : ''}
                onBlur={formik.handleBlur}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div>
              <InputField
                onChange={formik.handleChange}
                isLabel={true}
                value={formik.values.phone_number}
                type='text'
                name='phone_number'
                placeholder='Phone Number'
                error={
                  formik.errors.phone_number ? formik.errors.phone_number : ''
                }
                onBlur={formik.handleBlur}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
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
              placeholder='Select an gender'
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
          </>
        );
      case 4:
        return (
          <>
            <InputField
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.password}
              type='password'
              name='password'
              placeholder='Password'
              error={formik.errors.password ? formik.errors.password : ''}
              onBlur={formik.handleBlur}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />

            <InputField
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.confirmPassword}
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              error={
                formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
              onBlur={formik.handleBlur}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </>
        );
    }
  };

  const handleNextStep = () => {
    // validate current step before moving to next step
    const validate = async () => {
      const v = await formik.validateForm();
      if (v && Object.keys(v).length > 0) {
        formik.setErrors(v);
      } else {
        setCurrentStep(currentStep + 1);
      }
    };
    validate();
  };

  const handleBackStep = () => {
    setVerify(false);
    setCurrentStep(currentStep - 1);
  };

  // if user already verify the otp anf after he change in email or phone
  // then we need to verify again
  useEffect(() => {
    if (verify) {
      if (formik.values.email_id || formik.values.phone_number) {
        setVerify(false);
      }
    }
  }, [formik.values.email_id, formik.values.phone_number]);

  /**
   * Otp modal open functions
   */
  const openOtpModal = async () => {
    // first check verify user is true or not
    try {
      const payload = {
        email: formik.values.email_id,
        phone_number: formik.values.phone_number,
      };
      setIsLoading(true);
      const res = await api.verifyUser(payload);
      if (!res) {
        toast.error('User already exists');
        setIsLoading(false);
        return;
      }

      formik.validateForm().then((v) => {
        if (v && Object.keys(v).length > 0) {
          return;
        }
        setOpenModal(true);
      });
    } catch (error) {
      toast.error('User already exists');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        className='flex flex-col gap-5 w-full max-w-md px-5 '
        onSubmit={formik.handleSubmit}>
        {renderStepContent()}

        {currentStep < 4 && ( // Show buttons only for steps before the last one
          <div className='flex justify-end gap-2'>
            {currentStep !== 1 && (
              <Button
                type='button'
                disabled={currentStep === 1}
                onClick={handleBackStep}
                color='primary'
                className='grow justify-center px-5 py-2.5 text-white bg-black
                      rounded-[96.709px] disabled:bg-gray-600'>
                Back
              </Button>
            )}

            {currentStep == 2 && !verify ? (
              <Button
                type='button'
                onClick={openOtpModal}
                color='primary'
                isLoading={isLoading}
                className='grow justify-center px-5 py-2.5 text-white bg-violet-600
                          rounded-[96.709px] '>
                Verify
              </Button>
            ) : (
              <Button
                type='button'
                onClick={handleNextStep}
                color='primary'
                className='grow justify-center px-5 py-2.5 text-white bg-violet-600
                      rounded-[96.709px] '>
                Next
              </Button>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              onClick={handleBackStep}
              color='primary'
              className='grow justify-center px-5 py-2.5 text-white bg-black
                      rounded-[96.709px] disabled:bg-gray-600'>
              Back
            </Button>
            <Button
              isLoading={isLoading}
              type='submit'
              color='primary'
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600
                      rounded-[96.709px] '>
              Submit
            </Button>
          </div>
        )}

        {currentStep === 1 && (
          <Link
            href={'/auth/login'}
            className='flex justify-end gap-2 font-semibold text-sm'>
            Already have an account?{' '}
          </Link>
        )}
      </form>

      <OTPModal
        openModal={openModal}
        onClose={onClose}
        email={formik.values.email_id}
        mobile={formik.values.phone_number}
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
  email,
  mobile,
  successVerifyOtp,
}: any) => {
  const [isSendOtp, setIsSetOtp] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState('');
  useEffect(() => {
    const sendOtp = async () => {
      setIsSetOtp(true);
      setIsOtpLoading(true);
      const response = await api.generateOtp({
        email_id: email,
        phone_number: mobile,
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
  }, [openModal, mobile]);

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
        if (values.otp === otp) {
          successVerifyOtp();
          // reset formik
          formik.resetForm();
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
    // reset formik
    formik.resetForm({
      values: {
        otp: '',
      },
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={openModal} hideCloseButton={true}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <div className='flex w-full'>
                <div>Verify Your OTP</div>
              </div>
              <button
                className='absolute right-4 top-4 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-100'
                onClick={handleClose}>
                <XMarkIcon className='w-5 h-5 text-gray-500' />
              </button>
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isOtpLoading}
                color='primary'
                onClick={(e: any) => {
                  formik.handleSubmit();
                }}>
                Verify
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignupForm;
