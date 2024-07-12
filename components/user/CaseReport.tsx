'use client';
import Image from 'next/image';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import { useUser } from '@/context/UserContext';
import CaseReportLoader from '../Skeleton/CaseReportLoader';

const CaseReport = ({ id }: { id: string }) => {
  const { user: userId, userDetails } = useUser();

  const {
    data,
    isLoading: caseLoading,
    error,
  } = useSWR(
    id && userId ? ['/case/case-report', id] : null,
    () => api.getCaseDetails(id),
    {
      shouldRetryOnError: false,
    }
  );

  const quesionsIds = data?.question_answers && data?.question_answers[0];
  const ques_ids: any[] = [];
  quesionsIds &&
    Object.keys(quesionsIds).forEach((key) => {
      ques_ids.push(key);
    });

  const { data: questions, isLoading } = useSWR(
    data && id && userId ? ['/case/questions', ques_ids] : null,
    () => api.getQuestionary({ question_ids: ques_ids })
  );

  console.log(questions);

  // question ans mapping
  const ansQuestions: any = [];
  quesionsIds &&
    Object.entries(quesionsIds).forEach(([key, value]: any) => {
      getQuestionTypeAndValue(key, value, questions?.questions);
    });

  function getQuestionTypeAndValue(
    questionId: string,
    userAnswers: string,
    ques: any[]
  ) {
    const question = ques?.find((q) => q.question_id === Number(questionId));
    if (!question) {
      return null; // Question not found
    }
    const ans = {
      question_label: question?.question_name,
      value: userAnswers,
    };
    ansQuestions.push(ans);
  }

  return (
    <>
      {isLoading || caseLoading ? (
        <CaseReportLoader />
      ) : (
        <>
          {/* Card */}
          <div className='flex justify-around align-bottom gap-3 p-3 bg-gray-100 rounded-md'>
            <div className='flex justify-center items-center flex-col'>
              <span className='text-gray-400 text-sm font-semibold'>
                Case id
              </span>
              <span className='text-sm '>{id}</span>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <span className='text-gray-400 text-sm font-semibold'>
                Patient Name
              </span>
              <span className='text-sm '>
                {userDetails?.first_name + ' ' + userDetails?.last_name}
              </span>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <span className='text-gray-400 text-sm font-semibold'>Dob</span>
              <span className='text-sm '>
                {userDetails?.dob || '22/04/1997'}
              </span>
            </div>
          </div>

          {error ? (
            <div className='mt-5 flex items-center justify-center flex-col'>
              <Image src='/icons/wait.svg' width={500} height={500} alt='' />
              <span className='text-green-500'>In Progress Please Wait</span>
            </div>
          ) : (
            <>
              {/* Picture */}
              <div className='mt-5'>
                <h1 className='text-base font-semibold text-gray-800'>
                  Uploaded Picture
                </h1>
                <div className='flex mt-2 gap-3'>
                  {data?.image_path.map((image: any, i: number) => (
                    <div
                      key={i}
                      className='flex flex-col justify-center align-middle p-1 bg-slate-200 rounded-md'>
                      <div>
                        <div>
                          <Image
                            src={image.name}
                            width={100}
                            height={150}
                            alt=''
                          />
                        </div>
                        {/* <div className='text-center'>
                          <span className='text-sm'>{image.value}</span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answers */}
              {/* <div className='mt-5 max-w-2xl'>
                <div className='relative overflow-x-auto'>
                  <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope='col' className='px-6 py-3 w-1/2'>
                          Questions
                        </th>
                        <th scope='col' className='px-6 py-3 w-1/2'>
                          Answers
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions &&
                        ansQuestions?.map((ans: any, i: number) => (
                          <tr
                            key={i}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td
                              scope='row'
                              className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                              {ans.question_label}
                            </td>
                            <td
                              scope='row'
                              className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                              {ans.value}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div> */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default CaseReport;
