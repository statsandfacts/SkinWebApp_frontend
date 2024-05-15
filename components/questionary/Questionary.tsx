'use client';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import md5 from 'md5';
import { Fragment, useEffect, useState } from 'react';
import MultiSelectForm from './MultiSelectForm';
import { Button, Radio, RadioGroup, cn } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import { resetQuestions } from '@/redux/slices/questionary.slice';
import { useUser } from '@/context/UserContext';
import { getLocalStorage, setLocalStorage } from '@/utils/localStore';
import KeyCriteriaQuestion from './KeyCriteriaQuestion';

export const CustomRadio = (props: any) => {
  const { children, value, ...otherProps } = props;

  return (
    <Radio
      value={value} // Set the value prop here
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

const Questionary = () => {
  const { isLoggedIn } = useUser();
  const dispatch = useDispatch();
  const {
    data: kc,
    isLoading,
    error,
  } = useSWR(isLoggedIn && '/view_key_criteria', () => api.getKeyCriteria(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  if (error) {
    throw error;
  }

  const [keyCriteria, setKeyCriteria] = useState({});
  const [movetoQuestionary, setMovetoQuestionary] = useState(false);
  const [questionary, setQuestionary] = useState([]);
  const [loading, setLoading] = useState(false);

  const key_criteria = kc?.key_criteria;

  useEffect(() => {
    if (kc && kc?.key_criteria) {
      const storedCriteria = getLocalStorage('keyCriteria');
      if (storedCriteria) {
        setKeyCriteria(() => {
          return storedCriteria;
        });
      }
    }
  }, [kc]);

  const handleSelect = (e: Event, question: any) => {
    setKeyCriteria((prev) => ({
      ...prev,
      [question]: (e?.target as HTMLInputElement)?.value || '',
    }));
  };
  const submitKc = async (e: any, kc: any) => {
    try {
      e.preventDefault();

      // check if this KC selected or not
      if (!keyCriteria.hasOwnProperty(kc)) {
        toast.error('Please select any option');
        return;
      }

      setLoading(true);
      let selectedKc = '';
      setLocalStorage('keyCriteria', keyCriteria);
      if (keyCriteria) {
        Object.values(keyCriteria).forEach((kc: any) => {
          if (kc) {
            selectedKc += kc;
          }
        });
      }

      /**
       * Hash with md5
       */
      const hash = md5(selectedKc);
      if (hash) {
        let ids: String[] = [];
        const res = await api.showRecords(hash);

        if (res && res.records?.length > 0) {
          res.records.map((record: any) => {
            const id = record[record.length - 3];
            const i = id && id.toString();
            ids.push(i);
          });
        } else {
          toast.error('No records found');
        }

        // after get ids call get questionary api
        if (ids && ids.length > 0) {
          const res = await api.getQuestionary({ question_ids: ids });
          if (res && res.question_details) {
            setQuestionary(res?.question_details);
            setMovetoQuestionary(true);
            dispatch(resetQuestions());
          } else {
            toast.error('No question found');
            setLoading(false);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const backToKeyCriteria = (value: boolean) => {
    setMovetoQuestionary(value);
  };
  const [step, setStep] = useState(0);

  const handleNextKc = (e: any, kc: any) => {
    e.preventDefault();
    if (!keyCriteria.hasOwnProperty(kc)) {
      toast.error('Please select any option');
      return;
    }
    setStep(step + 1);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full'>
          {/* key criteria */}
          {key_criteria &&
            !movetoQuestionary &&
            key_criteria.map((kc: any, i: number) => (
              <div key={kc[0] + '_' + i} className='w-full'>
                {step === i && (
                  <>
                    <KeyCriteriaQuestion
                      key={kc[0] + '_' + i}
                      question={kc[1]}
                      options={kc[2]}
                      defaultSelected={keyCriteria}
                      onSelect={(e: Event) => handleSelect(e, kc[1])}
                    />
                    <div className='w-full flex justify-center gap-4'>
                      <Button
                        onClick={(e) => setStep(step - 1)}
                        color='primary'
                        className='grow justify-center px-5 py-2.5 text-white bg-black
                      rounded-[96.709px] disabled:bg-gray-600'
                        disabled={step === 0}>
                        Prev
                      </Button>

                      {key_criteria.length - 1 === step ? (
                        <Button
                          onClick={(e) => submitKc(e, kc[1])}
                          color='primary'
                          isLoading={loading}
                          className='grow justify-center px-5 py-2.5 text-white bg-violet-600
                        rounded-[96.709px]'>
                          Submit
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => handleNextKc(e, kc[1])}
                          color='primary'
                          className='grow justify-center px-5 py-2.5 text-white bg-violet-600
                      rounded-[96.709px]'>
                          Next
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          {/* {!movetoQuestionary && (
            <div className='w-full flex justify-center mt-5'>
              <Button
                onClick={submitKc}
                color='primary'
                isLoading={loading}
                className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
                Next
              </Button>
            </div>
          )} */}

          {movetoQuestionary && (
            <MultiSelectForm
              questionary={questionary}
              backToKeyCriteria={backToKeyCriteria}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Questionary;
