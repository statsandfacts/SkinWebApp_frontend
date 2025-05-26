import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
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

  // 💡 Reset modal state when phone number changes
  useEffect(() => {
    setOtp("");
    setIsOTPSent(false);
    setVerificationCode("");
    setUserId("");
    setLoading(false);
    setVerifying(false);
  }, [phoneNumber, isOpen]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await sendOtp({ phone_number: phoneNumber });

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

      if (!otp.trim()) {
        toast.warn("Please enter the OTP.");
        return;
      }

      if (otp === verificationCode) {
        toast.success("Phone number verified successfully!");
        onVerified();
        onClose();
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
            <InputField
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              isLabel
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="danger" onPress={onClose}>
            Cancel
          </Button>
          {isOTPSent && (
            <Button
              color="primary"
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
