import GeneratePrescription from '@/components/user/GeneratePrescription';
import TitleHeader from '@/components/user/TitleHeader';
import React from 'react';

const Prescription = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <TitleHeader title='Prescription' desc='' isBack={true} />
      <GeneratePrescription caseId={params.id} />
    </div>
  );
};

export default Prescription;
