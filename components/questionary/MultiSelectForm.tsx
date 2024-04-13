'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  cn,
} from '@nextui-org/react';
import PhotoUpload from './PhotoUpload';
import * as api from '@/services/app.service';
import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { initializeRazorpay } from '@/utils/rozerpay';
import {
  setAnswers,
  increaseStep,
  decreaseStep,
  setDisableNext,
  setPhotoUploadEnable,
} from '@/redux/slices/questionary.slice';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../common/InputField';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';

// Radio Component
const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
      }}>
      {children}
    </Radio>
  );
};

const CustomCheckbox = (props: any) => {
  const { children, ...otherProps } = props;
  return (
    <Checkbox
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex max-w-md w-full bg-content1 m-0',
          'hover:bg-content2 items-center justify-start',
          'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
        label: 'w-full',
      }}>
      {children}
    </Checkbox>
  );
};

// Input Component
function InputBox({ question }: any) {
  const dispatch = useDispatch();
  const [input, setInput] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    if (value.length > 3) {
      dispatch(setDisableNext(false));
    } else {
      dispatch(setDisableNext(true));
    }
  };

  const handleBlurred = () => {
    const key = Object.keys(input);
    const id = key[0];
    const value = input[id];
    dispatch(setAnswers({ id, value }));
  };

  return (
    <>
      <InputField
        onBlur={handleBlurred}
        onChange={handleInputChange}
        name={question.question_id}
        value={input[question.question_id]}
        type='text'
        placeholder='Type your problem'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </>
  );
}
const imageUrl = 'https://nextcare.s3.us-east-2.amazonaws.com';
// Main Component
const MultiStepForm = ({ questionary, backToKeyCriteria }: any) => {
  const { currentStep, answers, disableNext, photoUploadEnable, uploadImages } =
    useSelector((state: any) => state.questionary);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: userId, userSession: sessionId } = useUser();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Scroll to top when enter to form
  useEffect(() => {
    // Check if the current component is rendered (assuming a unique identifier)
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleNextStep = () => {
    dispatch(setDisableNext(true));
    dispatch(increaseStep());
  };

  const handlePrevStep = () => {
    if (photoUploadEnable) {
      dispatch(setPhotoUploadEnable(false));
    }
    dispatch(setDisableNext(false));
    dispatch(decreaseStep());
  };

  const backToKC = () => {
    backToKeyCriteria(false);
  };

  const handlePhotoUpload = () => {
    dispatch(increaseStep());
    dispatch(setPhotoUploadEnable(true));
  };

  const handleQuestionSelect = (e: any, question: any) => {
    const { value } = e.target;
    const id = question?.question_id;

    dispatch(setAnswers({ id, value }));
    dispatch(setDisableNext(false));
  };

  const handleCheckboxChange = (value: any, id: string) => {
    setSelectedValues(value);

    if (value.length > 0) {
      dispatch(setDisableNext(false));
    } else {
      dispatch(setDisableNext(true));
    }
    const ans = value?.join(',');
    dispatch(setAnswers({ id, value: ans }));
  };

  const handlePayment = () => {
    // save the questionary answers
    if (!userId) {
      toast.error('Please login first');
      router.push('/auth/login');
      return;
    }
    payment();
  };

  const payment = async () => {
    setLoading(true);
    const res = await initializeRazorpay();
    if (!res) {
      alert('Something went wrong');
      setLoading(false);
      return;
    }
    // creating a new order
    const result = await fetch(`/api/payment`, {
      method: 'POST',
      body: JSON.stringify({
        amount: 250,
        currency: 'INR',
        receipt: 'order_rcpt_' + Date.now(),
        payment_capture: 1,
      }),
    });

    const data = await result.json();
    if (!data) {
      setLoading(false);
      alert('Server error. Are you online?');
      return;
    }
    // Getting the order details back
    // const { amount, id: order_id, currency } = data.data;

    var options = {
      key: data.rozerpayKey, // Enter the Key ID generated from the Dashboard
      name: 'Next.care',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thank you for shopping with us',
      handler: async function (response: any) {
        if (response) {
          const payload = {
            session_id: sessionId,
            user_id: userId,
            question_answers: [answers],
          };
          const data = await api.saveQuestionnaire(payload);

          const imageArray =
            uploadImages?.map((file: File) => imageUrl + '/' + file) || [];
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
  };

  return (
    <div>
      {loading && (
        <div className='w-full flex flex-col items-center justify-center'>
          <Loader />
        </div>
      )}
      <div className='w-full flex flex-col items-center justify-center'>
        {!photoUploadEnable &&
          questionary &&
          questionary?.map((question: any, index: number) => (
            <div key={index} className='w-full'>
              {index === currentStep && (
                <>
                  <div
                    key={question.question_id}
                    className='flex flex-col w-full'>
                    <span className='text-lg p-3'>
                      <span>
                        {currentStep + 1} {'. '}
                      </span>{' '}
                      {question.question_type}
                    </span>
                    <>
                      {/* if values length is greater then one then it is select one else it is input box */}
                      {question?.allowed_values.length > 1 ? (
                        question?.multiple_val_allowed ? (
                          <>
                            <CheckboxGroup
                              classNames={{
                                base: 'w-full',
                              }}
                              value={selectedValues}
                              onChange={(value) =>
                                handleCheckboxChange(
                                  value,
                                  question?.question_id
                                )
                              }>
                              {question.allowed_values.map((option: any) => (
                                <CustomCheckbox
                                  value={option}
                                  name={question.question_id}
                                  key={option}>
                                  {option}
                                </CustomCheckbox>
                              ))}
                            </CheckboxGroup>
                          </>
                        ) : (
                          <RadioGroup
                            onChange={(e) => handleQuestionSelect(e, question)}
                            value={answers[question.question_id]}
                            name={question.question_id}
                            className='w-full text-black'>
                            {question.allowed_values.map((option: any) => (
                              <CustomRadio
                                name={option}
                                value={option}
                                key={option}>
                                {option}
                              </CustomRadio>
                            ))}
                          </RadioGroup>
                        )
                      ) : (
                        <>
                          <InputBox question={question} />
                        </>
                      )}
                    </>
                    {/* )} */}
                  </div>
                </>
              )}
            </div>
          ))}

        {/* Image upload section */}
        {photoUploadEnable && (
          <div className='mb-3'>
            <PhotoUpload />
          </div>
        )}

        <div className='flex justify-center gap-3 mt-3'>
          {currentStep > 0 && (
            <Button
              onClick={handlePrevStep}
              className='grow justify-center px-5 py-2.5 text-white border-2 border-black border-solid rounded-full bg-black'>
              Previous
            </Button>
          )}

          {currentStep == 0 && (
            <Button
              onClick={backToKC}
              className='grow justify-center px-5 py-2.5 text-white border-2 border-black border-solid rounded-full bg-black'>
              Previous
            </Button>
          )}

          {currentStep < questionary.length - 1 && (
            <Button
              isDisabled={disableNext}
              onClick={handleNextStep}
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
              Next
            </Button>
          )}

          {currentStep === questionary.length - 1 && (
            <Button
              isDisabled={disableNext}
              onClick={handlePhotoUpload}
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
              Photo Upload
            </Button>
          )}

          {photoUploadEnable && (
            <Button
              onClick={handlePayment}
              className='grow justify-center px-5 py-2.5 text-white bg-blue-600 rounded-[96.709px]'>
              Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
