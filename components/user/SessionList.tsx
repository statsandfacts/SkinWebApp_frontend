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
            {data?.cases?.map((item: any, index: number) => (
              <Link
                key={item.case_id}
                href={`/user/sessions/${item?.case_id}`}
                className='mt-3'>
                <div className='flex flex-wrap gap-4 items-center justify-between border-y p-3 cursor-pointer'>
                  <div>
                    <span className='text-sm font-bold text-gray-500'>
                      {index + 1}
                    </span>
                  </div>

                  <div>
                    <span className='text-sm border-r px-2'>
                      {item?.diseases}
                    </span>
                  </div>

                  <div className='text-sm'>
                    {item?.doctor_name || 'Not assigned'}
                  </div>
                  <div className='text-sm'>{item?.created_date}</div>
                  <div className='flex flex-col gap-2'>
                    {item?.case_status.toLowerCase() === 'in progress' ? (
                      <>
                        <div>
                          <span className='text-sm text-green-500'>
                            {item?.case_status}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={(e) => prescription(e, item?.case_id)}
                        // href={`/user/sessions/prescription/${item?.case_id}`}
                        className='flex justify-between items-center gap-2 p-2 bg-transparent border border-gray-300 text-gray-700 rounded-full'>
                        <ArrowDownTrayIcon className='w-4' /> Prescription
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SessionList;
