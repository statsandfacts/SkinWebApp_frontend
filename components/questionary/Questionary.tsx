'use client';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import md5 from 'md5';
import { Fragment, useEffect, useState } from 'react';
import MultiSelectForm from './MultiSelectForm';
import { Button, Radio, RadioGroup, cn } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { redirect } from 'next/navigation';
import _, { orderBy } from 'lodash';
import AuthProvider from '@/app/AuthProvider';
import { useDispatch } from 'react-redux';
import { resetQuestions } from '@/redux/slices/questionary.slice';
import { useUser } from '@/context/UserContext';
import { getLocalStorage, setLocalStorage } from '@/utils/localStore';

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

const KeyCriteriaQuestion = ({
  question,
  options,
  onSelect,
  defaultSelected,
}: any) => {
  const combinedValue = defaultSelected?.[question] || ''; // Use optional chaining
  return (
    <div className='w-full'>
      {question && question.length > 0 && (
        <div className='w-full flex flex-col items-center justify-center'>
          <p className='w-full text-start pb-2 pl-1'>
            <span className='text-xl font-semibold text-start'>{question}</span>
          </p>
          <RadioGroup
            name={question}
            className='w-full text-black mb-3'
            value={combinedValue}
            onChange={(e) => onSelect(e)}>
            {options &&
              options.length > 0 &&
              options.split(',').map((option: string, index: string) => (
                <CustomRadio key={option + '_' + index} value={option}>
                  {option}
                </CustomRadio>
              ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

const Questionary = () => {
  const { isLoggedIn } = useUser();
  const dispatch = useDispatch();
  const { data: kc, isLoading } = useSWR(
    isLoggedIn && '/view_key_criteria',
    () => api.getKeyCriteria(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

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
  const submitKc = async (e: any) => {
    try {
      e.preventDefault();
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

        if (res && res.records.length > 0) {
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

  const defaultValue = {
    Gender: 'Male', // Default selection for "question 1"
    // 'question 2 key': 'option 1', // Default selection for "question 2"
    // ...other questions
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
              <KeyCriteriaQuestion
                key={kc[0] + '_' + i}
                question={kc[1]}
                options={kc[2]}
                defaultSelected={keyCriteria}
                onSelect={(e: Event) => handleSelect(e, kc[1])}
              />
            ))}
          {!movetoQuestionary && (
            <div className='w-full flex justify-center mt-5'>
              <Button
                onClick={submitKc}
                color='primary'
                isLoading={loading}
                className='grow justify-center px-5 py-2.5 text-white bg-violet-600 rounded-[96.709px]'>
                Next
              </Button>
            </div>
          )}

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
