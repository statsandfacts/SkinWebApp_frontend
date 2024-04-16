import CaseReport from '@/components/user/CaseReport';
import TitleHeader from '@/components/user/TitleHeader';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TitleHeader title='Case Report' desc='' isBack={true} />
      <CaseReport id={params.id} />
    </div>
  );
}
