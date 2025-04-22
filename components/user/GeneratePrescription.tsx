'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import * as api from '@/services/app.service';
import Image from 'next/image';
import PDFGenerate from './PDFGenerate';
import { Button } from "@heroui/button";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loader from '../Loader';
import CaseReportLoader from '../Skeleton/CaseReportLoader';

const GeneratePrescription = ({ caseId }: any) => {
  let componentRef = useRef(null);
  const { data, error, isLoading } = useSWR(
    caseId ? ['case/prescription?case_id=', caseId] : null,
    () => api.getCasePrescription(caseId)
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data?.patient_name?.replace(/\s/g, '-')}-Payslip`,
    onPrintError: () => alert('there is an error when printing'),
  });

  return (
    <>
      {isLoading ? (
        <CaseReportLoader />
      ) : (
        <div className='max-w-3xl flex flex-col'>
          <div className='flex justify-end py-2'>
            <Button color='danger' variant='bordered' onClick={handlePrint}>
              Download
            </Button>
          </div>
          <PDFGenerate data={data} componentRef={componentRef} />
        </div>
      )}
    </>
  );
};

export default GeneratePrescription;
