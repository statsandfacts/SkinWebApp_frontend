import { Metadata } from "next";
import {
  User,
  Phone,
  Mail,
  Shield,
  Lock,
  Key,
  Fingerprint,
  UserCheck,
} from "lucide-react";

import DashboardHeader, {
  ShowDashboardPercentage,
} from "../_components/DashboardHeader";
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
      link: "/dashboard/my-account/update-emegency-contact",
      icon: Phone,
    },
    {
      title: "Contact Us",
      link: "/contact-us",
      icon: Mail,
    },
    {
      title: "Security Questions",
      link: "/dashboard/my-account/security-questions",
      icon: Key,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white pb-8">
      <DashboardHeader />

      <ShowDashboardPercentage />

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
