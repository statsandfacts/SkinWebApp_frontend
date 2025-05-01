"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import FontAwesomeXIcon from "@/components/SvgIcon/FontAwesomeXIcon";

const SLRFooter = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">💬 Your Opinion Matters</h2>
      <p className="text-gray-700 mb-4">
        We are the first of our kind in the industry, and we had love to hear
        how we did to help you understand your health better. Do share your
        thoughts using the feedback link below or simply drop us a note on our
        social media pages. Every word goes a long way in motivating our team
        and delivering better.
      </p>

      <p className="text-gray-700 mb-2">Social Links:</p>
      <div className="flex items-center gap-4 py-2 mt-4">
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
          <FontAwesomeXIcon color="#ffffff" height={16} width={16} />
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

      <div className="mt-6 text-gray-800 italic">
        Your health deserves more than numbers — it deserves insight.
        <br />
        Thank you for trusting us with your care.
        <br />
        <span className="text-sky-800 font-semibold">
          🧡 Nextcare.Life — Future of Care
        </span>
      </div>
    </div>
  );
};

export default SLRFooter;
