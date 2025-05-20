"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useEffect } from "react";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { sendOtp } from "@/services/api.digitalPrescription.service";

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  onVerified: () => void;
}

export default function PhoneVerificationModal({
  isOpen,
  onClose,
  phoneNumber,
  onVerified,
}: PhoneVerificationModalProps) {
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState("");

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await sendOtp({ phone_number: phoneNumber });

      // Store code and user ID
      setVerificationCode(response.verification_code);
      setUserId(response.user_id);

      setIsOTPSent(true);
      toast.success("OTP sent successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setVerifying(true);
      if (otp === verificationCode) {
        toast.success("Phone number verified successfully!");
        onVerified(); // Notify parent
        onClose(); // Close modal
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch {
      toast.error("Something went wrong during verification.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Phone Verification</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            We will send an OTP to <strong>{phoneNumber}</strong>.
          </p>

          {!isOTPSent ? (
            <Button
              onPress={handleSendOtp}
              color="primary"
              isLoading={loading}
              className="w-full"
            >
              Send OTP
            </Button>
          ) : (
            <>
              <InputField
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                isLabel
                className="text-xl py-2 px-2 h-10"
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="danger" onPress={onClose}>
            Cancel
          </Button>
          {isOTPSent && (
            <Button
              color="success"
              isLoading={verifying}
              onPress={handleVerifyOtp}
            >
              Verify
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
