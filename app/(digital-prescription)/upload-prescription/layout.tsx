
const PrescriptionLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <div className='px-2 sm:px-6 md:px-18 xl:px-20 blue-slate-gradient'>
          {children}
        </div>
      </>
    );
  };
  
  export default PrescriptionLayout;