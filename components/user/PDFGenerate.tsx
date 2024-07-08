'use client';
import { COMMON } from '@/config/const';
import { GlobeAltIcon, InboxIcon, PhoneIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PDFGenerate = ({ data, componentRef }: any) => {
  return (
    <section className='p-5 border'>
      <div className='px-3 print:px-10' ref={componentRef}>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex justify-center items-end text-3xl font-bold text-[#31382E] whitespace-nowrap'>
            <Image src='/logo.svg' alt='logo' width={100} height={100} />
            <span className='text-gray-400 text-xs font-normal'>Beta</span>
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <p className='text-center'>
              <span className='text-xl font-bold block'>
                Prescriptions based{' '}
              </span>
              <span className='text-xl font-bold text-[#ff7043] uppercase'>
                Skincare{' '}
              </span>
              <span className='text-xl font-bold'>at your</span>
              <span className='text-xl font-bold block'>fingertip</span>
            </p>
          </div>
        </div>

        <div className='flex flex-row justify-between py-5'>
          <div className='p-2 border border-[#ffd6c5] bg-[#ffd6c5]'>
            <span>Name:</span>
            <span>{data?.patient_name}</span>
          </div>
          <div className='p-2 border border-[#ffd6c5] bg-[#ffd6c5]'>
            <span>Date:</span>
            <span>{data?.date}</span>
          </div>
        </div>

        <div>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-[#ffd6c5]'>
              <thead>
                <tr className='border-2 border-[#ffd6c5] bg-gray-50'>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Diagnosis
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Medicine
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Dosage
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Drug
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Company
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.diagnosis_medicines?.map((med: any, i: number) => (
                  <tr key={i} className='bg-white border-2 border-[#ffd6c5]'>
                    <td
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                      {med?.diagnosis}
                    </td>
                    <td className='px-6 py-4 border-2 border-[#ffd6c5]'>
                      {med?.medicine}
                    </td>
                    <td className='px-6 py-4 border-2 border-[#ffd6c5]'>
                      {med?.dosage}
                    </td>
                    <td className='px-6 py-4 border-2 border-[#ffd6c5]'>
                      {med?.drug}
                    </td>
                    <td className='px-6 py-4 border-2 border-[#ffd6c5]'>
                      {med?.company}
                    </td>
                    <td className='px-6 py-4 border-2 border-[#ffd6c5]'>
                      {med?.remarks}
                    </td>
                  </tr>
                ))}

                {/* <tr className='bg-white border-b  dark:border-gray-700'>
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-2 border-[#ffd6c5]'>
                    ringworm
                  </td>
                  <td className='px-6 py-4'>Terbinafine</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>

        <div className='flex flex-row justify-between py-5'>
          <div>
            <div className='p-2 border border-[#ffd6c5] bg-[#ffd6c5]'>
              <span>Doctor Name:</span>
              <span>{data?.doctor_name}</span>
            </div>

            {data?.seal_stamp && (
              <div className='p-2 '>
                <Image
                  src={data?.seal_stamp}
                  alt={data?.seal_stamp || 'doc stamp'}
                  width={150}
                  height={80}
                />
              </div>
            )}
          </div>

          {data?.signature && (
            <div className='p-2 '>
              <Image
                src={data?.signature}
                alt={data?.signature || 'No Image'}
                width={150}
                height={80}
              />
            </div>
          )}
        </div>

        <div className='flex flex-row justify-between py-5  border-gray-600 border-t'>
          <div className='flex flex-col gap-2 px-5'>
            <div className='p-2 flex gap-2 items-center'>
              <Image src='/NClogo.png' alt='logo' width={40} height={40} />
              <Link href={COMMON.APP_URL}>{COMMON.APP_NAME}</Link>
            </div>
            <div className='p-2 flex gap-2'>
              <InboxIcon className='w-6' />
              <span>support@Nextcare.com</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 px-5'>
            <div className='p-2 flex gap-2'>
              <GlobeAltIcon className='w-6' />
              <span>nextcare.life</span>
            </div>
            <div className='p-2 flex gap-2'>
              <PhoneIcon className='w-6' />
              <span>+91 9124416966</span>
            </div>
          </div>
        </div>
        <p className='text-center text-sm text-gray-500 font-semibold'>
          <a href='nextcare.life'>Nextcare.life</a> is in beta, please consult a
          doctor before following any prescribed medication.{' '}
          <span className='text-red-500'>*</span>
        </p>
      </div>
    </section>
  );
};

export default PDFGenerate;
