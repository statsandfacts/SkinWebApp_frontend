import { Metadata } from "next";
import AccountDetails from "../../_components/AccountDetailsUpdate";

export const metadata: Metadata = {
  title: "Account Details Update",
  
};

const AccountDetailsUpdate = () => {
  return (
    <div>
      <AccountDetails />
    </div>
  );
};

export default AccountDetailsUpdate;
