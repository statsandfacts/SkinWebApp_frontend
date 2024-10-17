"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  setIsRedeemDiscount,
  setPharmacyUserId,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { redeemDiscountToken } from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { toast } from "react-toastify";

export default function RedeemDiscountModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { isRedeemDiscountOpen, pharmacyUserId } = useSelector(
    (state: any) => state.auth
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    dispatch(setIsRedeemDiscount(false));
  };

  const handleRedeem = () => {
    setIsLoading(true);
    redeemDiscountToken({
      pharmacy_id: pharmacyUserId,
      customer_id: userId,
    })
      .then((response) => {
        toast.success("Token Redeemed Successfully.");
        dispatch(setPharmacyUserId(null));
        onClose();
      })
      .catch((error) => {
        const errMsg =
          error.response?.data?.message || "Discount token redeemed failed!";
        toast.error(errMsg);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal size={"sm"} isOpen={isRedeemDiscountOpen} onClose={onClose}>
        <ModalContent className="mb-[4.5rem]">
          <ModalHeader className="flex flex-col gap-1">
            Redeem Your Discount Token
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center">
              <p className="text-center mb-4 bg-yellow-200 text-sky-800 p-4 rounded-lg">
                You have a discount token available! Click the button below to
                redeem it.
              </p>
              <Button
                isLoading={isLoading}
                color="success"
                className="rounded-lg text-white font-semibold"
                onPress={handleRedeem}
              >
                Redeem
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
