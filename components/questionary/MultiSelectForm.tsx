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

import {
  setAnswers,
  increaseStep,
  decreaseStep,
  setDisableNext,
  setPhotoUploadEnable,
} from '@/redux/slices/questionary.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import LoginModal from '../Auth/LoginModal';
import { setLoginModal } from '@/redux/slices/loginModal.slice';
import { useUser } from '@/context/UserContext';

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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    if (value.length > 1) {
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
      <textarea
        onBlur={handleBlurred}
        onChange={handleInputChange}
        name={question.question_id}
        value={input[question.question_id]}
        placeholder='Type your problem'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </>
  );
}

// Main Component
const MultiStepForm = ({ questionary, backToKeyCriteria }: any) => {
  const [isTextboxForQuestion, setIsTextboxForQuestion] = useState(false);
  const [textboxForQuestion, setTextboxForQuestion] = useState('');
  const { currentStep, answers, disableNext, photoUploadEnable, uploadImages } =
    useSelector((state: any) => state.questionary);
  const router = useRouter();
  const { user: userId } = useUser();

  const [nextLoading, setNextLoading] = useState(false);

  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Scroll to top when enter to form
  useEffect(() => {
    // Check if the current component is rendered (assuming a unique identifier)
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsTextboxForQuestion(false);
  }, [currentStep]);

  const handleNextStep = () => {
    setNextLoading(true);
    setTimeout(() => {
      setNextLoading(false);
      dispatch(setDisableNext(true));
      dispatch(increaseStep());
    }, 500);
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
    setNextLoading(true);
    setTimeout(() => {
      setNextLoading(false);
      dispatch(increaseStep());
      dispatch(setPhotoUploadEnable(true));
    }, 700);
  };

  const handleQuestionSelect = (value: any, question: any) => {
    const id = question.question_id;
    const isTextbox = question.allowed_values.some(
      (val: any) => val.is_textbox === true && val.value === value
    );
    setIsTextboxForQuestion(isTextbox);
    if (isTextbox) {
      setTextboxForQuestion(value);
      dispatch(setAnswers({ id, value }));
      dispatch(setDisableNext(false));
    } else {
      setNextLoading(true);
      dispatch(setAnswers({ value, id })); // Destructuring for clarity
      dispatch(setDisableNext(false));
    }

    setTimeout(() => {
      if (!isTextbox) {
        setNextLoading(false);
        dispatch(increaseStep());
      }
    }, 500);
  };

  const handleIsTextboxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTextboxForQuestion(value);
  };

  const handleIsTextboxBlur = (id: any) => {
    const options = answers[id];
    const ans = options + '&&' + textboxForQuestion;
    dispatch(setAnswers({ id, value: ans }));
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
    router.push('/checkout');
  };

  useEffect(() => {
    if (currentStep === 1 && !userId) {
      dispatch(setLoginModal(true));
    }
  }, [currentStep]);
  console.log(uploadImages);
  return (
    <div>
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
                    <p className=' pb-2 pl-1'>
                      <span className='text-xl font-semibold text-start'>
                        {question?.question_name}
                      </span>{' '}
                    </p>
                    <>
                      {/* if values length is greater then one then it is select one else it is input box */}
                      {question?.question_type === 'multiple choice' ? (
                        question?.multiple_val_allowed ? (
                          <>
                            <CheckboxGroup
                              classNames={{
                                base: 'w-full',
                              }}
                              value={selectedValues}
                              onValueChange={(value) =>
                                handleCheckboxChange(
                                  value,
                                  question?.question_id
                                )
                              }>
                              {question.allowed_values.map((option: any) => (
                                <CustomCheckbox
                                  value={option.value}
                                  name={question.question_id}
                                  key={option.value}>
                                  {option.value}
                                </CustomCheckbox>
                              ))}
                            </CheckboxGroup>
                          </>
                        ) : (
                          <>
                            <RadioGroup
                              onValueChange={(value) =>
                                handleQuestionSelect(value, question)
                              }
                              value={
                                answers[question.question_id]
                                  ? answers[question.question_id].split('&&')[0]
                                  : ''
                              }
                              name={question.question_id}
                              className='w-full text-black'>
                              {question.allowed_values.map((option: any) => (
                                <CustomRadio
                                  key={option.value} // Key optimization
                                  name={option.value}
                                  value={option.value}>
                                  {option.value}
                                </CustomRadio>
                              ))}
                            </RadioGroup>

                            {isTextboxForQuestion && (
                              <div className='mt-4'>
                                <textarea
                                  onChange={handleIsTextboxChange}
                                  onBlur={() =>
                                    handleIsTextboxBlur(question.question_id)
                                  }
                                  name={question.question_id}
                                  placeholder='Enter your answer here'
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                />
                              </div>
                            )}
                          </>
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
              isLoading={nextLoading}
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
              Next
            </Button>
          )}

          {currentStep === questionary.length - 1 && (
            <Button
              isDisabled={disableNext}
              isLoading={nextLoading}
              onClick={handlePhotoUpload}
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
              Next
            </Button>
          )}

          {photoUploadEnable && (
            <Button
              onClick={handlePayment}
              isDisabled={uploadImages.length === 0}
              className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
              Payment
            </Button>
          )}
        </div>
      </div>
      <LoginModal isCloseIcon={true} />
    </div>
  );
};

export default MultiStepForm;
