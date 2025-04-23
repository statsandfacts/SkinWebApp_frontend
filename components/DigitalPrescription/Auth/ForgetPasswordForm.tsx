"use client";
import {Button} from "@heroui/button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputField from "@/components/common/InputField";
import {
  sendOtp,
  updateUser,
} from "@/services/api.digitalPrescription.service";
import { useRouter } from "next/navigation";
import { setLoginModal } from "@/redux/slices/digitalPrescription/auth.slice";
import LoginDrawer from "./LoginDrawer";

interface SendOtpResponse {
  verification_code?: string;
  user_id?: string;
}

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [userId, setUserId] = useState<string | undefined>("");
  const [responseOtp, setResponseOtp] = useState<string | undefined>("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response: SendOtpResponse = await sendOtp({ email_id: email });
      if (!response.user_id) {
        toast.error("User dose not exist, please register.");
        return;
      }
      setResponseOtp(response.verification_code);
      setUserId(response.user_id);
      setIsOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (otp === responseOtp) {
        setIsOtpVerified(true);
        toast.success("OTP verified successfully");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    setIsLoading(true);
    try {
      await updateUser({ user_id: userId, phone_no: newPhoneNumber });
      router.replace("/");
      dispatch(setLoginModal(true));
      toast.success("Phone number updated successfully");
      cleanUp();
    } catch (error) {
      toast.error("Failed to update phone number");
    } finally {
      setIsLoading(false);
    }
  };

  const cleanUp = () => {
    setEmail("");
    setOtp("");
    setUserId(undefined);
    setResponseOtp(undefined);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setNewPhoneNumber("");
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full max-w-md px-5">
        {/* Email Input */}
        <InputField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          placeholder="Email"
          error={!email && !isOtpSent ? "Email is required" : ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled={isOtpSent}
        />

        {/* OTP Input */}
        {isOtpSent && !isOtpVerified && (
          <InputField
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            name="otp"
            placeholder="Enter OTP"
            error={!otp ? "OTP is required" : ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        )}

        {/* New Phone Number Input */}
        {isOtpVerified && (
          <InputField
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            value={newPhoneNumber}
            type="tel"
            name="phone_number"
            placeholder="Enter new phone number"
            error={!newPhoneNumber ? "Phone number is required" : ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        )}

        {/* Button Logic */}
        <Button
          isLoading={isLoading}
          onClick={
            isOtpVerified
              ? handleUpdatePhoneNumber
              : isOtpSent
              ? handleVerifyOtp
              : handleSendOtp
          }
          className="p-6 w-full text-white bg-sky-900 rounded-lg"
        >
          {isOtpVerified
            ? "Update Phone Number"
            : isOtpSent
            ? "Verify OTP"
            : "Send OTP"}
        </Button>
      </div>

      <div className="mt-3 text-center">
        <p className="text-gray-700 text-sm">
          Already have an account?{" "}
          <span
            className="text-sky-800 font-semibold cursor-pointer"
            onClick={() => dispatch(setLoginModal(true))}
          >
            Please login
          </span>
        </p>
      </div>

      <LoginDrawer />
    </>
  );
};

export default ForgetPasswordForm;
