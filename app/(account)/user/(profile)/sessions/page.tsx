import SessionList from '@/components/user/SessionList';
import TitleHeader from '@/components/user/TitleHeader';

const Sessions = () => {
  return (
    <div>
      <TitleHeader
        title='Your Consultation'
        desc='Review Your Consultation Sessions'
        isBack={false}
        isMobileBack={true}
      />
      <SessionList />
    </div>
  );
};

export default Sessions;
