import AuthProvider from '../AuthProvider';

const TreatmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className='bg-gradient-to-r from-[#9DEAF4]  to-[#F0936C] min-h-screen'>
        {children}
      </div>
    </AuthProvider>
  );
};

export default TreatmentLayout;
