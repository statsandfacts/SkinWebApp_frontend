import { Metadata } from "next";
import { User, Phone, Mail } from "lucide-react";

import MyAccount from "../_components/MyAccount";
import ItemCard from "../_components/ItemCard";
export const metadata: Metadata = {
  title: "AccountDetails",
};

const MyAccountPage = () => {
  const items = [
    {
      title: "Account Details Update",
      link: "/dashboard/my-account/account-details-update",
      icon: User,
    },
    {
      title: "Update Emergency Contact",
      link: "/dashboard/emergency-contact",
      icon: Phone,
    },
    {
      title: "Contact Us",
      link: "/contact-us",
      icon: Mail,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white pb-8">
      <MyAccount />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            title={item.title}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAccountPage;
