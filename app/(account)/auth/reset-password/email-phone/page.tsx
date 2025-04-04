import VerifyEmailPhone from "@/components/DigitalPrescription/Auth/VerifyEmailPhone";

const VerifyEmailPhoneRP = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-slate-900 text-xl font-bold mt-3">
        Verify Registered Email/Phone
      </h1>
      <VerifyEmailPhone />
    </div>
  );
};

export default VerifyEmailPhoneRP;
