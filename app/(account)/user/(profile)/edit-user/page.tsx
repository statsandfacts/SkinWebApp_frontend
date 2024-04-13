import EditUserForm from '@/components/Auth/EditUserForm';
import TitleHeader from '@/components/user/TitleHeader';
const EditUser = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col'>
        <TitleHeader
          title='Edit Profile'
          desc=''
          isBack={false}
          isMobileBack={true}
        />
        <div className='w-full flex flex-col gap-5 max-w-sm mt-5 pb-5'>
          <EditUserForm />
        </div>
      </div>
    </>
  );
};

export default EditUser;
