"use client";
import React, { useState } from "react";
import Script from "next/script";
import { initiatePayment } from "@/services/api.digitalPrescription.service";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const appointmentId = "49fb2b5b-3852-4b4e-b586-b21f90246bc5"; 
  const Amount = 500; 
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const initRes = await initiatePayment({
        appointment_id: appointmentId,
        amount: Amount,
      });
      console.log("Payment initiated:", initRes);

      // We'll assume initRes.id === Razorpay order_id
      const razorOrderId = initRes.id;
      if (!razorOrderId) throw new Error("Missing order ID");

      // 2️⃣ Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Amount * 100, // in paise
        currency: "INR",
        name: "Nextcare.life",
        description: "Doctor Consultation Payment",
        order_id: razorOrderId,
        handler: (razorResp: any) => {
          console.log("Razorpay payment successful:", razorResp);
          
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (err: any) => {
        console.error("Payment failed:", err.error);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment error:", error.message || error);
      alert("Payment initiation failed: " + (error.message || error));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-white shadow-md rounded p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">Amount to pay: ₹{Amount}</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`px-4 py-2 rounded text-white ${
            isProcessing ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
