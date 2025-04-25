"use client";
import React from "react";

const FiveMinuteCCDetails = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700">
        🩺 5-Minute Clinical Consult
      </h1>
      <p className="text-xl text-gray-600 font-medium">
        Fast. Reliable. Virtual Care — When You Need It.
      </p>

      <p className="text-md text-gray-700 max-w-2xl mx-auto">
        Your time matters. That’s why we’re creating 5-Minute Clinical Consult —
        a seamless telemedicine platform designed for quick, efficient, and
        expert-backed virtual consultations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left">
        <div className="flex items-start space-x-3 bg-emerald-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">⏱</span>
          <p className="font-semibold text-emerald-900">
            Consult in 5 Minutes or Less
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">📱</span>
          <p className="font-semibold text-blue-900">
            Accessible Anywhere, Anytime
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-violet-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">🧑‍⚕️</span>
          <p className="font-semibold text-violet-900">
            Licensed Doctors, Real-Time Support
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-gray-100 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">🔒</span>
          <p className="font-semibold text-gray-800">Secure & Confidential</p>
        </div>
      </div>

      <div className="pt-8">
        <p className="text-lg font-semibold text-orange-600 animate-pulse">
          🚧 Currently in Design – Launching Soon!
        </p>
        <p className="text-gray-600">
          We’re working hard behind the scenes to bring fast, reliable
          telehealth to your fingertips.
          <br />
          <span className="font-medium text-gray-800">
            Stay tuned — quality care is just a few clicks away.
          </span>
        </p>
      </div>
    </div>
  );
};

export default FiveMinuteCCDetails;
