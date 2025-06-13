import { Metadata } from "next";
import {
  Pill,
  FileText,
  Bell,
  UserPlus,
  Activity,
  Stethoscope,
  User,
  Phone,
  LucideHandHeart,
  MessageCircleCode
} from "lucide-react";
import ItemCard from "./_components/ItemCard";
import DashboardHeader from "./_components/DashboardHeader";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  const items = [
    { title: "Prescriptions", link: "/dashboard/prescriptions", icon: Pill },
    { title: "Reports", link: "/dashboard/reports", icon: FileText },
    {
      title: "Health Camp Reports",
      link: "/dashboard/health-camp-reports",
      icon: Stethoscope,
    },
    { title: "Set Reminder", link: "/dashboard/reminders", icon: Bell },
    {
      title: "Add Family Member",
      link: "/dashboard/add-family-member",
      icon: UserPlus,
    },
    {
      title: "General Health Indicators",
      link: "/dashboard/health-indicators",
      icon: Activity,
    },
    // { title: "Manage Account", link: "/manage-account", icon: User },
    {
      title: "Emergency Contact",
      link: "/dashboard/emergency-contact",
      icon: Phone,
    },
    {
      title: "My Account",
      link: "/dashboard/my-account",
      icon: User,
    },
    {
      title: "Calculators",
      link: "/calculator",
      icon: LucideHandHeart,
    },
    // {
    //   title: "Chats",
    //   link: "/dashboard/chats",
    //   icon: MessageCircleCode,
    // },
  ];

  return (
    <div className="flex flex-col items-center bg-white pb-8">
      <DashboardHeader />

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

export default Dashboard;
