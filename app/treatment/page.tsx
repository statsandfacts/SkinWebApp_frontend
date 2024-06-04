import Questionary from '@/components/questionary/Questionary';
const Treatment = () => {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full flex flex-col gap-5 max-w-md m-7'>
          <Questionary />
        </div>
      </div>
    </>
  );
};
export default Treatment;
