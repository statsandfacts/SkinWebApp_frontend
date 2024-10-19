import React from "react";
import ShowPopover from "../common/Popover";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setIsRedeemPopover } from "@/redux/slices/digitalPrescription/auth.slice";

const RedeemSuccessfullyPopover = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isRedeemPopoverOpen } = useSelector((state: any) => state.auth);

  const handleClose = () => {
    dispatch(setIsRedeemPopover(false));
  };

  return (
    <div>
      <ShowPopover
        onClose={handleClose}
        isOpen={isRedeemPopoverOpen}
        onOpenChange={handleClose}
        isConfirmButton={false}
        closeButtonLabel={"Close"}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Discount token redeemed successfully!
          </p>
          <div className="w-full bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              Your discount has been applied. Thank you for using the service!
            </p>
          </div>
        </div>
      </ShowPopover>
    </div>
  );
};

export default RedeemSuccessfullyPopover;
