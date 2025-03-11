"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("en");

  // Fetch the current locale from cookies on mount
  useEffect(() => {
    const getLocale = async () => {
      try {
        const response = await axios.get("/api/get-locale");
        setCurrentLocale(response.data.locale);
      } catch (error) {
        console.error("Error fetching locale:", error);
      }
    };

    getLocale();
  }, []);

  // Function to change language
  const changeLanguage = async () => {
    const newLocale = currentLocale === "en" ? "or" : "en";

    try {
      await axios.post("/api/set-locale", { locale: newLocale });

      // Update state and refresh the page
      setCurrentLocale(newLocale);
      router.refresh();
    } catch (error) {
      console.error("Error updating locale:", error);
    }
  };

  return (
    <button
      onClick={changeLanguage}
      className="px-2 py-2 w-28 bg-sky-800 text-white rounded flex justify-center items-center gap-1"
    >
      <Languages size={20} />
      {currentLocale === "en" ? "ଓଡ଼ିଆ" : "English"}
    </button>
  );
}
