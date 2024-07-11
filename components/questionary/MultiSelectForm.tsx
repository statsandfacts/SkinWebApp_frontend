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
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import {
  setAnswers,
  increaseStep,
  decreaseStep,
  setDisableNext,
  setPhotoUploadEnable,
} from '@/redux/slices/questionary.slice';
import { setLoginModal } from '@/redux/slices/loginModal.slice';
import PhotoUpload from './PhotoUpload';
import { toast } from 'react-toastify';
import { COMMON } from '@/config/const';

// CustomRadio Component
const CustomRadio = React.memo(({ children, ...otherProps }: any) => (
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
));

CustomRadio.displayName = 'CustomRadio';

// CustomCheckbox Component
const CustomCheckbox = React.memo(({ children, ...otherProps }: any) => (
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
));

CustomCheckbox.displayName = 'CustomCheckbox';

// InputBox Component
const InputBox = React.memo(({ question }: any) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInput(value);

    if (value.length > 1) {
      dispatch(setDisableNext(false));
    } else {
      dispatch(setDisableNext(true));
    }
  };

  const handleBlurred = () => {
    dispatch(setAnswers({ id: question.question_id, value: input }));
  };

  return (
    <textarea
      onBlur={handleBlurred}
      onChange={handleInputChange}
      name={question.question_id}
      value={input}
      placeholder='Please describe your issue'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />
  );
});

InputBox.displayName = 'InputBox';

// Main Component
const MultiStepForm = ({ questionary, backToKeyCriteria }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user: userId } = useUser();

  const { currentStep, answers, disableNext, photoUploadEnable, uploadImages } =
    useSelector((state: any) => state.questionary);

  const [isTextboxForQuestion, setIsTextboxForQuestion] = useState(false);
  const [textboxForQuestion, setTextboxForQuestion] = useState('');
  const [nextLoading, setNextLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [preventNext, setPreventNext] = useState(false);

  useEffect(() => {
    if (currentStep >= COMMON.LOGIN_OPEN_MODAL_AT && !userId) {
      dispatch(setLoginModal(true));
      setPreventNext(true);
      return;
    } else {
      setPreventNext(false);
    }

    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsTextboxForQuestion(false);
  }, [currentStep, userId, dispatch]);

  const handleNextStep = () => {
    if (preventNext) {
      toast.error('Please login to continue');
      return;
    }

    setNextLoading(true);
    moveToNextStep();
  };

  const handlePrevStep = () => {
    if (photoUploadEnable) {
      dispatch(setPhotoUploadEnable(false));
    }
    dispatch(setDisableNext(false));
    dispatch(decreaseStep());
  };

  const handlePhotoUpload = () => {
    setNextLoading(true);
    moveToNextStep({ photoUpload: true });
  };

  // Move to next step
  const moveToNextStep = ({ photoUpload = false } = {}) => {
    setTimeout(() => {
      setNextLoading(false);
      dispatch(increaseStep());
      if (selectedValues.length > 0) {
        setSelectedValues([]);
      }
      if (photoUpload) {
        dispatch(setPhotoUploadEnable(true));
      }
    }, 500);
  };

  const handleQuestionSelect = (value: any, question: any) => {
    if (preventNext) {
      toast.error('Please login to continue');
      return;
    }

    const id = question.question_id;
    const isTextbox = question.allowed_values.some(
      (val: any) => val.is_textbox && val.value === value
    );
    setIsTextboxForQuestion(isTextbox);
    if (isTextbox) {
      setTextboxForQuestion(value);
      dispatch(setAnswers({ id, value }));
      dispatch(setDisableNext(false));
    } else {
      setNextLoading(true);
      dispatch(setAnswers({ id, value }));
      dispatch(setDisableNext(false));
    }
    if (!isTextbox) {
      moveToNextStep();
    }
  };

  const handleIsTextboxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextboxForQuestion(e.target.value);
  };

  const handleIsTextboxBlur = (id: string) => {
    const ans = `${answers[id]}&&${textboxForQuestion}`;
    dispatch(setAnswers({ id, value: ans }));
  };

  const handleCheckboxChange = (value: any, id: string) => {
    setSelectedValues(value);
    dispatch(setDisableNext(value.length === 0));
    dispatch(setAnswers({ id, value: value.join(',') }));
  };

  const handlePayment = () => {
    setNextLoading(true);
    router.push('/checkout');
  };

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {!photoUploadEnable &&
        questionary?.map((question: any, index: number) => (
          <div key={index} className='w-full'>
            {index === currentStep && (
              <div key={question.question_id} className='flex flex-col w-full'>
                <p className='pb-2 pl-1'>
                  <span className='text-xl font-semibold text-start'>
                    {question?.question_name}
                  </span>
                </p>
                {question?.question_type === 'multiple choice' ? (
                  question?.multiple_val_allowed ? (
                    <CheckboxGroup
                      classNames={{ base: 'w-full' }}
                      value={selectedValues}
                      onValueChange={(value) =>
                        handleCheckboxChange(value, question?.question_id)
                      }>
                      {question.allowed_values.map((option: any) => (
                        <CustomCheckbox
                          key={option.value}
                          value={option.value}
                          name={question.question_id}>
                          {option.value}
                        </CustomCheckbox>
                      ))}
                    </CheckboxGroup>
                  ) : (
                    <>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleQuestionSelect(value, question)
                        }
                        value={
                          answers[question.question_id]?.split('&&')[0] || ''
                        }
                        name={question.question_id}
                        className='w-full text-black'>
                        {question.allowed_values.map((option: any) => (
                          <CustomRadio
                            key={option.value}
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
                  <InputBox question={question} />
                )}
              </div>
            )}
          </div>
        ))}

      {photoUploadEnable && (
        <div className='mb-3'>
          <PhotoUpload />
        </div>
      )}

      {/* All button config */}
      <div className='flex justify-center gap-3 mt-3'>
        <Button
          onClick={
            currentStep === 0 ? () => backToKeyCriteria(false) : handlePrevStep
          }
          className='grow justify-center px-5 py-2.5 text-white border-2 border-black border-solid rounded-full bg-black'>
          Previous
        </Button>

        {currentStep < questionary.length ? (
          <Button
            isDisabled={disableNext}
            onClick={
              currentStep === questionary.length - 1
                ? handlePhotoUpload
                : handleNextStep
            }
            isLoading={nextLoading}
            className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
            Next
          </Button>
        ) : null}

        {photoUploadEnable && (
          <Button
            onClick={handlePayment}
            isLoading={nextLoading}
            isDisabled={uploadImages.length === 0}
            className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
            Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
