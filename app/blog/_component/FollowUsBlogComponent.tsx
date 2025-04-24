"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const FollowUsBlogComponent: React.FC = () => {
  return (
    <>
      <div className="shadow-2xl p-4 rounded-lg ">
        <p className="text-gray-700 font-semibold text-2xl">Follow Us</p>
        <div className="flex gap-4 items-center py-2">
          <Link
            href="https://www.linkedin.com/company/nextcare-life/"
            className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="https://twitter.com/NextcareLife"
            className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <Twitter className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr"
            className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.facebook.com/share/19dqeCuNou/?mibextid=wwXIfr"
            className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.youtube.com/@NCL24283"
            className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <Youtube className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FollowUsBlogComponent;
