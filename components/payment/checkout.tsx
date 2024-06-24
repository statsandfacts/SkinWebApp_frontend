'use client';
import { COMMON } from '@/config/const';
import { useUser } from '@/context/UserContext';
import { initializeRazorpay } from '@/utils/rozerpay';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import { removeLocalStorage } from '@/utils/localStore';
import { useRouter } from 'next/navigation';
import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from '@nextui-org/react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid';
import {
  AtSymbolIcon,
  IdentificationIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const Checkout = () => {
  const router = useRouter();
  const { user: userId, userSession: sessionId } = useUser();

  // const [total, setTotal] = useState(0);
  // const [offerAmount, setOfferAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    data: invoice,
    isLoading,
    error,
    mutate,
  } = useSWR(
    ['/get-invoice', couponCode],
    () => api.getInvoice({ couponCode }),
    {
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    const checkCoupon = () => {
      if (invoice?.discount_amount > 0) {
        setIsCouponApplied(true);
      } else {
        setCoupon('');
        toast.error('Invalid Coupon');
      }
    };

    if (invoice && coupon) {
      checkCoupon();
    }
  }, [invoice]);

  const { answers, uploadImages } = useSelector(
    (state: any) => state.questionary
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^[6-9]\d{9}$/, 'Phone number must be 10 digits'),
    }),

    onSubmit: async (values) => {
      if (!userId) {
        toast.error('Please login first');
        return;
      }
      if (invoice.total_amount === 0) {
        skipPaymentMode();
      } else {
        payment(values);
      }
    },
  });

  /**
   * Skip payment mode
   */
  const skipPaymentMode = async () => {
    const orderDetails = await createPaymentAndOrder();
    if (!orderDetails) {
      toast.error('Failed to create payment and order.');
      return;
    }

    const payload = {
      session_id: sessionId,
      user_id: userId,
      question_answers: [answers],
    };
    try {
      const res = await api.saveQuestionnaire(payload);
      if (res) {
        removeLocalStorage('keyCriteria');
        setPaymentSuccess(true);
      } else {
        toast.error('Failed to save questionnaire');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   *  Payment mode
   * @param paymentDetails
   */
  const payment = async (paymentDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      setLoading(true);

      const orderDetails = await createPaymentAndOrder();
      if (!orderDetails) {
        throw new Error('Failed to create payment and order.');
      }
      const res = await initializeRazorpay();
      if (!res) {
        throw new Error('Failed to initialize Razorpay.');
      }

      const options = {
        key: 'rzp_test_EYyf1YAwk7kO7r', // Enter the Key ID generated from the Dashboard
        name: COMMON.PAYMENT_DETAILS.name,
        currency: COMMON.PAYMENT_DETAILS.currency,
        amount: orderDetails.amount,
        order_id: orderDetails.id,
        description: 'Thank you for shopping with us',
        handler: async (response: any) => {
          try {
            if (!response || !response.razorpay_payment_id) {
              throw new Error('Payment response is empty.');
            }

            const verifyPayload = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            };
            const verify = await api.verifyPayment(verifyPayload);

            if (verify && verify?.status === '200') {
              toast.success('Payment Successful');
            } else {
              toast.error('Payment Failed');
            }

            const payload = {
              session_id: sessionId,
              user_id: userId,
              question_answers: [answers],
            };
            try {
              const res = await api.saveQuestionnaire(payload);
              if (res) {
                removeLocalStorage('keyCriteria');
                setPaymentSuccess(true);
              } else {
                toast.error('Failed to save questionnaire');
              }
            } catch (error: any) {
              toast.error(error.message);
            }

            //end
          } catch (error: any) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: paymentDetails.name,
          email: paymentDetails.email,
          contact: paymentDetails.phone,
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment process was cancelled by the user');
            setLoading(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
      setLoading(false);
    }
  };

  const createPaymentAndOrder = async () => {
    try {
      const crtCase = await createCase();
      if (!crtCase && crtCase?.status !== 200) {
        toast.error('Something went wrong while creating case');
        return false;
      }

      const payload = {
        case_id: crtCase.case_id,
        currency: 'INR',
        amount: Number(invoice?.total_amount) || 0,
        created_by: userId,
      };
      const data = await api.savePaymentTransaction(payload);
      if (Number(invoice?.total_amount) == 0) {
        return data;
      }

      if (data && data.status === '200' && data.order_id) {
        const createOrder = await api.createOrder({
          amount: String(payload.amount),
          order_id: data.order_id,
        });
        if (createOrder) {
          return createOrder;
        } else {
          toast.error('Order creation failed');
        }
      } else {
        toast.error('Payment transaction already created');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCase = async () => {
    try {
      const imageArray =
        uploadImages?.map((file: File) => COMMON.IMAGE_URL + '/' + file) || [];

      let images = '';
      if (imageArray) {
        images = imageArray.join(',');
      }

      const createCasePayload = {
        patient_id: userId,
        image_path: images,
      };

      const res = await api.createCase(createCasePayload);
      return res;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleApplyCoupon = () => {
    if (!coupon) {
      toast.error('Please enter a coupon code');
      return;
    }
    setCouponCode(coupon);
  };

  const removeCoupon = () => {
    setCoupon('');
    setCouponCode(' ');
    setIsCouponApplied(false);
  };

  return (
    <>
      <div className='rounded-md'>
        <section>
          <div className=' bg-gray-50 px-4 pt-8 lg:mt-0'>
            <p className='text-xl font-medium'>Payment Details</p>
            <p className='text-gray-400'>
              Complete your order by providing your payment details.
            </p>
            <form className='' onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='mt-4 mb-2 block text-sm font-medium'>
                  Name
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='your Name'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                    <IdentificationIcon className='w-5 h-5 text-gray-400' />
                  </div>
                </div>
                {formik.errors.name && (
                  <small className='text-red-500'>{formik.errors.name}</small>
                )}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='mt-4 mb-2 block text-sm font-medium'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='your.email@gmail.com'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                    <AtSymbolIcon className='w-5 h-5 text-gray-400' />
                  </div>
                </div>
                {formik.errors.email && (
                  <small className='text-red-500'>{formik.errors.email}</small>
                )}
              </div>

              <div>
                <label
                  htmlFor='phone'
                  className='mt-4 mb-2 block text-sm font-medium'>
                  Phone
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='phone'
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='Phone'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                    <PhoneIcon className='w-5 h-5 text-gray-400' />
                  </div>
                </div>
                {formik.errors.phone && (
                  <small className='text-red-500'>{formik.errors.phone}</small>
                )}
              </div>
              {isLoading ? (
                <div className='flex gap-3 mt-4 flex-col'>
                  <div className='w-full flex gap-2'>
                    <Skeleton className='h-3 w-3/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                  </div>
                  <div className='w-full flex gap-2'>
                    <Skeleton className='h-3 w-3/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                  </div>
                  <div className='w-full flex gap-2'>
                    <Skeleton className='h-3 w-3/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                  </div>
                  <div className='w-full flex gap-2 mt-4'>
                    <Skeleton className='h-3 w-3/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                  </div>
                  <div className='w-full flex gap-2 mt-4'>
                    <Skeleton className='h-10 w-full rounded-lg' />
                  </div>
                </div>
              ) : (
                <>
                  <div className='mt-6 border-t border-b py-2'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900'>
                        Subtotal
                      </p>
                      <p className='font-semibold text-gray-900'>
                        {COMMON.RUPEE + ' ' + invoice?.original_amount}
                      </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <p className='text-sm font-medium text-gray-900'>GST</p>
                      <p className='font-semibold text-gray-900'>
                        {COMMON.RUPEE + ' ' + invoice?.gst_amount}
                      </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <p className='text-sm font-medium text-gray-900'>SGST</p>
                      <p className='font-semibold text-gray-900'>
                        {COMMON.RUPEE + ' ' + invoice?.sgst_amount}
                      </p>
                    </div>
                    {coupon.length > 0 && isCouponApplied ? (
                      <div className='flex items-center justify-between mt-2'>
                        <p className='text-sm font-medium text-gray-900'>
                          Saving
                        </p>
                        <p className='font-semibold text-green-500'>
                          -{COMMON.RUPEE + ' ' + invoice?.discount_amount}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className='mt-6 flex items-center justify-between'>
                    <p className='text-sm font-medium text-gray-900'>Total</p>
                    <p className='text-2xl font-semibold text-gray-900'>
                      {COMMON.RUPEE + ' ' + invoice?.total_amount}
                    </p>
                  </div>
                  <Button
                    isLoading={loading}
                    type='submit'
                    className='mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'>
                    Pay {COMMON.RUPEE + invoice?.total_amount}
                  </Button>
                </>
              )}
            </form>
          </div>
          <div className=' bg-gray-50 px-4 mt-8 p-5'>
            {isCouponApplied ? (
              <div className='mt-0'>
                <Chip
                  startContent={
                    <CheckCircleIcon className='h-4 w-4 text-green-500' />
                  }
                  variant='faded'
                  onClose={removeCoupon}>
                  <span className='text-green-500'>Welcome Offer</span>
                </Chip>
              </div>
            ) : (
              <>
                <div className=''>
                  <label
                    htmlFor='coupon'
                    className='mb-2 block text-sm font-medium'>
                    Do you have coupon or a voucher or gift card?
                  </label>
                  <div className='flex gap-5 w-full'>
                    <div className='relative w-full'>
                      <input
                        type='text'
                        id='coupon'
                        name='coupon'
                        onChange={(e) => setCoupon(e.target.value)}
                        value={coupon}
                        className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                        placeholder='Coupon code'
                      />
                      <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                        <IdentificationIcon className='w-5 h-5 text-gray-400' />
                      </div>
                    </div>

                    <Button
                      type='button'
                      color='primary'
                      variant='bordered'
                      onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <SuccessModal openModal={paymentSuccess} />
      </div>
    </>
  );
};

export default Checkout;

function SuccessModal({ openModal }: { openModal: boolean }) {
  return (
    <>
      <Modal
        isOpen={openModal}
        placement='bottom-center'
        hideCloseButton={true}
        backdrop={'blur'}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1 relative bg-green-100'>
              <div className='w-full'></div>
            </ModalHeader>
            <ModalBody>
              <div className='bg-white p-6  md:mx-auto'>
                <svg
                  viewBox='0 0 24 24'
                  className='text-green-600 w-16 h-16 mx-auto my-6'>
                  <path
                    fill='currentColor'
                    d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'></path>
                </svg>
                <div className='text-center'>
                  <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                    Payment Done!
                  </h3>
                  <p className='text-gray-600 my-2'>
                    Thank you for completing your secure online payment.
                  </p>
                  <p> Have a great day! </p>
                  <div className='py-10 text-center'>
                    <Link
                      href='/user/sessions'
                      className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                      Check Order
                    </Link>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
