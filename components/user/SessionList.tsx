'use client';

import { useUser } from '@/context/UserContext';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import SessionLoader from '../Skeleton/SessionLoader';

const SessionList = () => {
  const { user: userId } = useUser();
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    userId ? ['/user/session', userId] : null,
    () => api.getSessionList(userId),
    {
      revalidateOnMount: true,
    }
  );

  const prescription = (e: any, caseId: string) => {
    e.preventDefault();
    router.push(`/user/sessions/prescription/${caseId}`);
  };

  return (
    <>
      {isLoading ? (
        new Array(3).fill(1).map((_, index) => <SessionLoader key={index} />)
      ) : (
        <>
          <div className='my-5'>
            <div className='flex flex-col'>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full text-left text-sm font-light text-surface dark:text-white'>
                      <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
                        <tr>
                          <th scope='col' className='w-10 px-4 md:px-0 py-4'>
                            #
                          </th>
                          <th scope='col' className='px-4 md:px-0 py-4'>
                            CASE ID
                          </th>
                          <th scope='col' className='px-4 md:px-0 py-4'>
                            Doctor
                          </th>
                          <th scope='col' className='px-4 md:px-0 py-4'>
                            Date
                          </th>
                          <th
                            scope='col'
                            className='px-4 md:px-0 py-4'
                            align='center'>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.cases?.map((item: any, index: number) => (
                          <tr
                            key={index}
                            className='border-b border-neutral-200 dark:border-white/10 hover:bg-neutral-50 '>
                            <td className='whitespace-nowrap font-medium px-4 md:px-0'>
                              <Link
                                href={`/user/sessions/${item?.case_id}`}
                                className='block w-full py-4'>
                                {index + 1}
                              </Link>
                            </td>
                            <td className='whitespace-nowrap px-4 md:px-0'>
                              <Link
                                href={`/user/sessions/${item?.case_id}`}
                                className='block w-full py-4'>
                                {item?.case_id}
                              </Link>
                            </td>
                            <td className='whitespace-nowrap px-4 md:px-0'>
                              <Link
                                href={`/user/sessions/${item?.case_id}`}
                                className='block w-full py-4'>
                                {item?.doctor_name || 'Not assigned'}
                              </Link>
                            </td>
                            <td className='whitespace-nowrap px-4 md:px-0'>
                              <Link
                                href={`/user/sessions/${item?.case_id}`}
                                className='block w-full py-4'>
                                {item?.created_date}
                              </Link>
                            </td>
                            <td className='whitespace-nowrap px-4 md:px-0 text-center'>
                              <Link
                                href={`/user/sessions/${item?.case_id}`}
                                className='block w-full py-4'>
                                <div className='flex flex-col gap-2'>
                                  {item?.case_status.toLowerCase() ===
                                  'in progress' ? (
                                    <>
                                      <div>
                                        <span className='text-sm text-green-500'>
                                          {item?.case_status}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      onClick={(e) =>
                                        prescription(e, item?.case_id)
                                      }
                                      className='flex items-center justify-center gap-2 p-2 bg-transparent border border-gray-300 text-gray-700 rounded-full'>
                                      <ArrowDownTrayIcon className='w-4' />{' '}
                                      Prescription
                                    </button>
                                  )}
                                </div>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SessionList;
