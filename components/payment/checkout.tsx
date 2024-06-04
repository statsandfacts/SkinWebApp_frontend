'use client';
import { COMMON } from '@/config/const';
import { useUser } from '@/context/UserContext';
import { initializeRazorpay } from '@/utils/rozerpay';
import { Button } from '@nextui-org/button';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as api from '@/services/app.service';
import { removeLocalStorage } from '@/utils/localStore';
import { useRouter } from 'next/navigation';
import { Chip } from '@nextui-org/react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

const Checkout = () => {
  const router = useRouter();
  const { user: userId, userSession: sessionId } = useUser();

  const amount = {
    charges: 200,
    tax: 10,
    platform_fee: 10,
  };

  const [total, setTotal] = useState(0);
  const [offerAmount, setOfferAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const { answers, uploadImages } = useSelector(
    (state: any) => state.questionary
  );

  useMemo(() => {
    const total = amount.charges + amount.tax + amount.platform_fee;
    setTotal(total - offerAmount);
  }, [offerAmount]);

  const proceedPayment = () => {
    if (!userId) {
      toast.error('Please login first');
      return;
    }
    payment();
  };

  const payment = async () => {
    try {
      setLoading(true);
      const orderDetails = await createPaymentAndOrder();

      const res = await initializeRazorpay();
      if (!res) {
        alert('Something went wrong');
        setLoading(false);
        return;
      }

      // creating a new order
      // const result = await fetch(`/api/payment`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     amount: total,
      //     currency: 'INR',
      //     receipt: 'order_rcpt_' + Date.now(),
      //     payment_capture: 1,
      //   }),
      // });

      // const data = await result.json();
      if (!orderDetails) {
        setLoading(false);
        alert('Server error. Are you online?');
        return;
      }
      // Getting the order details back
      // const { amount, id: order_id, currency } = data.data;

      var options = {
        key: 'rzp_test_EYyf1YAwk7kO7r', // Enter the Key ID generated from the Dashboard
        name: 'Next Care',
        currency: orderDetails.currency,
        amount: orderDetails.amount,
        order_id: orderDetails.id,
        description: 'Thank you for shopping with us',
        handler: async function (response: any) {
          console.log(response);

          if (response) {
            const verifyPayload = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            };
            const verify = await api.verifyPayment(verifyPayload);

            if (verify && verify.status === 200) {
              toast.success('Payment Successful');
            }

            const payload = {
              session_id: sessionId,
              user_id: userId,
              question_answers: [answers],
            };
            const data = await api.saveQuestionnaire(payload);

            const imageArray =
              uploadImages?.map(
                (file: File) => COMMON.IMAGE_URL + '/' + file
              ) || [];
            let images = '';
            if (imageArray) {
              images = imageArray.join(',');
            }
            const createCasePayload = {
              patient_id: userId,
              image_path: images,
            };

            const res = await api.createCase(createCasePayload);
            if (res && res.status === 200) {
              removeLocalStorage('keyCriteria');
              toast.success(res.message || 'Case created successfully');
              router.replace('/user/sessions');
            } else {
              toast.error('The user already has a case created');
            }
            setLoading(false);
          }
        },
        prefill: {
          name: 'Akash Pradhan',
          email: 'akashpradhan@gmail.com',
          contact: '9999999999',
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createPaymentAndOrder = async () => {
    try {
      const payload = {
        case_id: '23e5df1a-4ccd-463c-9b6a-24791cbfb11a',
        currency: 'INR',
        amount: 100,
        created_by: userId,
      };
      const data = await api.savePaymentTransaction(payload);

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

  const handleApplyCoupon = async () => {
    if (!coupon) {
      toast.error('Please enter a coupon code');
      return;
    }
    // dommy logic
    if (coupon.length > 3) {
      setOfferAmount(100);
      setIsCouponApplied(true);
    } else {
      setOfferAmount(0);
      setIsCouponApplied(false);
    }
  };

  const removeCoupon = () => {
    setCoupon('');
    setOfferAmount(0);
    setIsCouponApplied(false);
  };

  return (
    <>
      <div className='rounded-md'>
        <section>
          <h2 className='uppercase tracking-wide text-lg font-semibold text-black my-2'>
            Order Summery
          </h2>

          <div className='flex flex-col justify-start items-start self-stretch flex-grow relative py-2 rounded-lg bg-black/5'>
            <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative py-2 px-4 bg-white/0 hover:bg-white/5'>
              <p className='flex-grow-0 flex-shrink-0 text-[13px] text-right text-black'>
                Charges
              </p>
              <p className='flex-grow-0 flex-shrink-0 text-base font-normal text-left text-black'>
                {COMMON.RUPEE + ' ' + amount.charges}
              </p>
            </div>
            <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative py-2 px-4 bg-white/0 hover:bg-white/5'>
              <p className='flex-grow-0 flex-shrink-0 text-[13px] text-right text-black'>
                GST
              </p>
              <p className='flex-grow-0 flex-shrink-0 text-base font-normal text-left text-black'>
                {COMMON.RUPEE + ' ' + amount.tax}
              </p>
            </div>
            <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative py-2 px-4 bg-white/0 hover:bg-white/5'>
              <p className='flex-grow-0 flex-shrink-0 text-[13px] text-right text-black'>
                Platform Fee
              </p>
              <p className='flex-grow-0 flex-shrink-0 text-base font-normal text-left text-black'>
                {COMMON.RUPEE + ' ' + amount.platform_fee}
              </p>
            </div>

            {coupon.length > 0 && offerAmount && isCouponApplied ? (
              <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative py-2 px-4 bg-white/0 hover:bg-white/5'>
                <p className='flex-grow-0 flex-shrink-0 text-[13px] text-right text-black'>
                  Offer
                </p>
                <p className='flex-grow-0 flex-shrink-0 text-base font-normal text-left text-green-500'>
                  -{COMMON.RUPEE + ' ' + offerAmount}
                </p>
              </div>
            ) : (
              ''
            )}

            <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative py-2 px-4 border-t border-black/30 bg-white/0 hover:bg-white/5'>
              <p className='flex-grow-0 flex-shrink-0 text-[13px] text-right text-black'>
                Total
              </p>
              <p className='flex-grow-0 flex-shrink-0 text-base font-medium text-left text-black'>
                {COMMON.RUPEE + ' ' + total}
              </p>
            </div>
          </div>

          {isCouponApplied ? (
            <div className='mt-10'>
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
            <div className='mt-10'>
              <span>Do you have coupon?</span>
              <div className='flex justify-start items-start self-stretch flex-grow relative py-2 rounded-lg gap-3 '>
                <input
                  type='text'
                  onChange={(e) => setCoupon(e.target.value)}
                  value={coupon}
                  className='border-2 basis-[80%] border-black/30 rounded-md py-2 px-4 w-full'
                  placeholder='Coupon code'
                />
                <Button
                  color='primary'
                  variant='bordered'
                  onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
      <Button
        isLoading={loading}
        onClick={proceedPayment}
        className='submit-button px-4 py-3 h-11 rounded-full bg-blue-500 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'>
        Pay {COMMON.RUPEE + total}
      </Button>
    </>
  );
};

export default Checkout;
