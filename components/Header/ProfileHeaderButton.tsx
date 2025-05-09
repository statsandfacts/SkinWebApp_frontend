"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  logOutUser,
  setLoginModal,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { resetPrescription } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { resetFamilyMember } from "@/redux/slices/digitalPrescription/familyMembers.slice";
import { userLogout } from "@/services/api.digitalPrescription.service";
import LoginModal from "../DigitalPrescription/Auth/LoginModal";
import LoginDrawer from "../DigitalPrescription/Auth/LoginDrawer";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProfileCompletionPercentage } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { getColorThroughPercentage } from "@/utils/isMobile";

const ProfileHeaderButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userId, userDetails } = useAuthInfo();
  const { profileCompletionData } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileCompletionPercentage(userId));
    }
  }, []);

  const handleLogout = () => {
    userLogout()
      .then((response) => {
        toast.success("Logout successfully.");
        dispatch(logOutUser());
        dispatch(resetPrescription());
        dispatch(resetFamilyMember());
        router.push("/");
      })
      .catch((error) => {
        toast.error("Logout Failed!");
      })
      .finally(() => {});
  };

  const mobileProfileElement = (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="flex gap-2 items-center">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color={getColorThroughPercentage(
                profileCompletionData?.profileCompletionPercentage
              )}
              name={userDetails?.name}
              size="md"
              src={userDetails?.user_profile_image_path}
            />
            {/* {profileCompletionData?.profileCompletionPercentage &&
              profileCompletionData?.profileCompletionPercentage !== 100 && (
                <p className="text-xs font-semibold text-primary p-1 bg-primary-mute rounded-2xl">
                  {profileCompletionData?.profileCompletionPercentage + "%"}
                </p>
              )} */}
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userDetails?.name}</p>
          </DropdownItem>
          <DropdownItem key="prescriptions" href="/dashboard/my-account">
            My Account
          </DropdownItem>
          <DropdownItem key="prescriptions" href="/dashboard/prescriptions">
            View Documents
          </DropdownItem>
          <DropdownItem key="prescriptions" href="/upload-prescription">
            Upload Documents
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );

  const renderButton = () => {
    if (!isMounted) {
      return null;
    }

    if (userId) {
      return <>{mobileProfileElement}</>;
    } else {
      return (
        <div className="flex sm:mr-10">
          <Button
            onClick={() => dispatch(setLoginModal(true))}
            className="grow justify-center px-5 py-2.5 text-sky-900 font-semibold bg-primary-mute border-2 border-sky-900 border-solid rounded-full"
          >
            Login
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center whitespace-nowrap sm:flex-col sm:justify-start sm:gap-0">
        {renderButton()}
        <LoginModal isCloseIcon={false} />
        <LoginDrawer />
      </div>
    </>
  );
};

export default ProfileHeaderButton;
