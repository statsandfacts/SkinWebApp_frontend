'use client';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import md5 from 'md5';
import { Fragment, useState } from 'react';
import MultiSelectForm from './MultiSelectForm';
import { Button, Radio, RadioGroup, cn } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { redirect } from 'next/navigation';
import { orderBy } from 'lodash';
import AuthProvider from '@/app/AuthProvider';
import { useDispatch } from 'react-redux';
import { resetQuestions } from '@/redux/slices/questionary.slice';
import { useUser } from '@/context/UserContext';

export const CustomRadio = (props: any) => {
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

  const [keyCriteria, setKeyCriteria] = useState([]);
  const [movetoQuestionary, setMovetoQuestionary] = useState(false);
  const [questionary, setQuestionary] = useState([]);
  const [loading, setLoading] = useState(false);

  const key_criteria = kc?.key_criteria;

  const handleSelect = (e: any, kc: any) => {
    const { value } = e.target;

    setKeyCriteria((prev) => {
      const newKeyCriteria: any = { ...prev };
      const kcName = kc[0];
      newKeyCriteria[kcName] = value;
      return newKeyCriteria;
    });
  };

  const submitKc = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      let selectedKc = '';
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full'>
          {/* key criteria */}
          {key_criteria &&
            !movetoQuestionary &&
            key_criteria.map((kc: any, i: number) => {
              return (
                <div key={i} className='w-full'>
                  {kc && kc.length > 0 && (
                    <RadioGroup
                      label={kc[1]}
                      name={kc[1]}
                      className='w-full text-black'
                      onChange={(e) => handleSelect(e, kc)}>
                      {kc[2] &&
                        kc[2].length > 0 &&
                        kc[2].split(',').map((option: any, index: number) => (
                          <CustomRadio
                            key={option + '_' + index}
                            value={option}>
                            {option}
                          </CustomRadio>
                        ))}
                    </RadioGroup>
                  )}
                </div>
              );
            })}
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
