"use client";
import React, { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const Amount = 100; // in INR
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", { method: "POST" });0
      const data = await response.json();

      if (!data.order_id) {
        throw new Error("No order_id returned from backend");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Amount * 100, // in paise
        currency: "INR",
        name: "Nextcare.life",
        description: "Test Transaction",
        order_id: data.order_id,
        handler: function (response: any) {
          console.log("Payment successful", response);
          // TODO: Handle success (e.g., call backend to mark payment as verified)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">Amount to pay: ₹{Amount}</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
