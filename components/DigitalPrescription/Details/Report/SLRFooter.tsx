"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import FontAwesomeXIcon from "@/components/SvgIcon/FontAwesomeXIcon";

const SLRFooter = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl text-primary font-bold mb-2 mr-10">
        Your Opinion Matters</h2>
      <p className="text-gray-700 mb-2">
        We are the first of our kind in the industry, and we had love to hear
        how we did to help you understand your health better. Do share your
        thoughts using the feedback link below or simply drop us a note on our
        social media pages. Every word goes a long way in motivating our team 
        and delivering better.
      </p>

      <p className="text-sky-700 mb-2 font-bold ">Social Links:</p>
      <div className="flex items-center gap-4 py-2 mt-2">
        <Link
          href="https://www.linkedin.com/company/nextcare-life/"
          className="p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-700 transition"
        >
          <Linkedin className="h-4 w-4" />
        </Link>
        <Link
          href="https://twitter.com/NextcareLife"
          className="p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-700 transition"
        >
          <FontAwesomeXIcon color="#ffffff" height={16} width={16} />
        </Link>
        <Link
          href="https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr"
          className="p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-700 "
        >
          <Instagram className="h-4 w-4" />
        </Link>
        <Link
          href="https://www.facebook.com/share/19dqeCuNou/?mibextid=wwXIfr"
          className="p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-700 transition"
        >
          <Facebook className="h-4 w-4" />
        </Link>
        <Link
          href="https://www.youtube.com/@NCL24283"
          className="p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-700 transition"
        >
          <Youtube className="h-4 w-4" />
        </Link>
      </div>
      <h5 className="text-sm text-sky-700 ">@2025 Stats & Facts Technologies Pvt. Ltd.</h5>

      <div className="mt-2 text-gray-800 italic">
        Your health deserves more than numbers — it deserves insight.
        <br />
        Thank you for trusting us with your care.
        <br />
        <span className="text-gray-800 font-semibold not-italic">
          Nextcare.Life — Future of Care
        </span>
      </div>
    </div>
  );
};

export default SLRFooter;
