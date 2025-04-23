"use client";
import { contactUs } from "@/services/api.digitalPrescription.service";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    if (name === "phone_no" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValue) {
      toast.error("Please verify the CAPTCHA before submitting.");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(formData.phone_no)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    
    setLoading(true);
    contactUs(formData)
      .then((response) => {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone_no: "",
          message: "",
        });
        setCaptchaValue(null);
      })
      .catch((error) => {
        toast.error(error?.message || "Message send failed!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="uppercase text-sm text-gray-600 font-bold">
          Full Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="uppercase text-sm text-gray-600 font-bold">
          Email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="uppercase text-sm text-gray-600 font-bold">
          Phone
        </label>
        <input
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="tel"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div>
        <label className="uppercase text-sm text-gray-600 font-bold">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Write your message"
          required
        />
      </div>

      {/* CAPTCHA Section */}
      <div className="flex justify-center mt-4">
        <ReCAPTCHA
          sitekey="6LeYdAArAAAAAALenH5N6MwlvY8dPORfgv_ymb0p"
          onChange={(value) => setCaptchaValue(value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="uppercase text-sm font-bold tracking-wide bg-sky-700 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline flex justify-center items-center"
        >
          {loading ? (
            <Loader2 className="h-6 w-6 text-white animate-spinner-ease-spin ml-3" />
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
