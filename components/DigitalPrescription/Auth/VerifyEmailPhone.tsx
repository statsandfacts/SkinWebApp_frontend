"use client";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { toast } from "react-toastify";
import { verifyExistingUser } from "@/services/api.digitalPrescription.service";
import { setSecurityPhone } from "@/redux/slices/digitalPrescription/auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";

const VerifyEmailPhone = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateInput = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^[6-9]\d{9}$/; // 10-digit phone number starting with 6-9 indian phone number
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    if (!input) return "Email or phone is required.";
    if (!emailRegex.test(input) && !phoneRegex.test(input)) {
      return "Enter a valid email or 10-digit phone number.";
    }
    return "";
  };

  const handleNext = async () => {
    const validationError = validateInput(value.trim());
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await verifyExistingUser(value);
      if (res.status === 200) {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (err: any) {
      if (err.response.data?.message === "User Exists.") {
        toast.success("Verification successful");
        dispatch(setSecurityPhone(value));
        router.push("/auth/reset-password/security-question");
        return;
      }
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-4 w-96 ">
      <h2 className="text-lg font-semibold mb-4">Verify Phone</h2>
      <Input
        type="text"
        label="Registered Phone"
        placeholder="Enter your phone"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isInvalid={!!error}
        errorMessage={error}
        className="mb-4"
      />
      <Button
        color="primary"
        disabled={loading}
        isLoading={loading}
        onClick={handleNext}
        fullWidth
      >
        Next
      </Button>
    </div>
  );
};

export default VerifyEmailPhone;
