"use client";
import { contactUs } from "@/services/api.digitalPrescription.service";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    contactUs(formData)
      .then((response) => {
        toast.success("Message send successfully!");
        setFormData({
          name: "",
          email: "",
          phone_no: "",
          message: "",
        });
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
