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
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import { useDispatch } from "react-redux";
import LoginModal from "./LoginModal";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { logOutUser } from "@/redux/slices/digitalPrescription/auth.slice";
import { resetPrescription } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { resetFamilyMember } from "@/redux/slices/digitalPrescription/familyMembers.slice";

const NavButtonDP = () => {
  const [isMounted, setIsMounted] = useState(false); // Track hydration phase
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId, userDetails } = useAuthInfo();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logOutUser());
    dispatch(resetPrescription());
    dispatch(resetFamilyMember())
    router.push("/");
  };

  const profileElement = (
    <Link href="/upload-prescription/prescriptions">
      <User
        as="button"
        name={userDetails?.name}
        description={userDetails?.email}
        className="transition-transform"
        avatarProps={{
          name: userDetails?.name,
        }}
      />
    </Link>
  );

  const mobileProfileElement = (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={userDetails?.name}
            size="sm"
            src={userDetails?.user_profile_image_path || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userDetails?.name}</p>
          </DropdownItem>
          <DropdownItem key="prescriptions">
            <Link href="/upload-prescription/prescriptions">View Case</Link>
            {/* <button onClick={() => router.push("/upload-prescription/prescriptions")} >View Case</button> */}
          </DropdownItem>
          {/* <DropdownItem key="configurations">
            <Link href="/user/edit-user">Edit User</Link>
          </DropdownItem>
          <DropdownItem key="help_and_feedback">Change Password</DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );

  const renderButton = () => {
    if (!isMounted) {
      // During server-side rendering, render nothing to avoid hydration mismatch
      return null;
    }

    if (userId) {
      return (
        <>
          <div className="hidden md:block">{profileElement}</div>
          <div className="md:hidden">{mobileProfileElement}</div>
        </>
      );
    } else {
      return (
        <div className="flex sm:mr-10">
          <Button
            onClick={() => dispatch(setLoginModal(true))}
            className="grow justify-center px-5 py-2.5 text-sky-900 border-2 border-sky-900 border-solid rounded-full bg-white"
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
      </div>
    </>
  );
};

export default NavButtonDP;
