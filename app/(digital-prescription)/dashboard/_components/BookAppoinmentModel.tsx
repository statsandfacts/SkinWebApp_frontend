"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAccepted: boolean;
  setIsAccepted: (value: boolean) => void;
}

export default function BookAppointmentModal({
  isOpen,
  onClose,
  isAccepted,
  setIsAccepted,
}: BookAppointmentModalProps) {
  const router = useRouter();

  const handleAccept = () => {
    router.push('/dashboard/appoinment/appoinment-type');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-semibold text-center">Terms & Conditions</h2>
        </ModalHeader>

        <ModalBody>
          <div className="max-h-64 overflow-y-auto text-sm text-gray-700 space-y-2 p-2 border rounded">
            <p><strong>1. Appointment Confirmation:</strong> Your appointment will be confirmed only after successful payment (if applicable) and consultant availability.</p>
            <p><strong>2. Consultation Fees:</strong> All fees must be paid in advance unless otherwise stated. Prices may vary based on consultant experience and session type.</p>
            <p><strong>3. Cancellation & Rescheduling:</strong> You may cancel/reschedule up to 24 hours before the appointment. Late cancellations or no-shows may forfeit the fee.</p>
            <p><strong>4. Refund Policy:</strong> Refunds are only available for timely cancellations. Missed appointments without notice are non-refundable.</p>
            <p><strong>5. Consultation Scope:</strong> Advice provided is based on consultant expertise and is not legally binding. Always consider additional opinions where necessary.</p>
            <p><strong>6. User Responsibility:</strong> Ensure all provided information is accurate. False information may result in rejection.</p>
            <p><strong>7. Privacy:</strong> We handle your data per our Privacy Policy. No personal data is shared without consent.</p>
            <p><strong>8. Right to Refuse Service:</strong> We reserve the right to decline or cancel appointments at our discretion.</p>
          </div>

          <div className="flex items-center space-x-2 justify-end mt-4">
            <input
              type="checkbox"
              id="accept"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              className="accent-primary"
            />
            <label htmlFor="accept" className="text-sm text-gray-600">
              I accept the terms and conditions.
            </label>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            className={`px-3 py-1 rounded text-white ${
              isAccepted ? 'bg-primary' : 'bg-primary opacity-50 cursor-not-allowed'
            }`}
            disabled={!isAccepted}
          >
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
