// import AuthProvider from '../AuthProvider';

const TreatmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='bg-gradient-to-r from-[#9DEAF4]  to-[#F0936C] min-h-screen px-4'>
        {children}
      </div>
    </>
  );
};

export default TreatmentLayout;
