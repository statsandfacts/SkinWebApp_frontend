"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
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

const ProfileHeaderButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId, userDetails } = useAuthInfo();

  useEffect(() => {
    setIsMounted(true);
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
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={userDetails?.name}
            size="sm"
            src={userDetails?.user_profile_image_path}
          />
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
