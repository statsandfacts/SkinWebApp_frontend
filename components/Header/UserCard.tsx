import React from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import * as api from "@/services/app.service";
import { toast } from "react-toastify";

export const UserTwitterCard = ({ userDetails, isMobile }: any) => {
  const { user: userId, setLogout } = useUser();

  const handleLogout = async () => {
    if (userId) {
      const data = await api.LogoutUser(userId);
      if (data) {
        console.log(data);
      }
      toast.success("Logout successfully");
      setLogout();
    }
  };
  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardBody className="flex flex-row justify-between w-full p-4 gap-3">
        <Link
          className={"flex justify-center items-center"}
          href={isMobile ? "/user/myprofile" : "/user/sessions"}
        >
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              name={userDetails?.first_name}
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {userDetails?.first_name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                {userDetails?.email_id}
              </h5>
            </div>
          </div>
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-violet-600 ml-3" />
        </Link>
      </CardBody>
      <CardFooter>
        <Button
          className={"w-full bg-violet-600"}
          color="primary"
          radius="full"
          size="sm"
          variant={"solid"}
          onPress={handleLogout}
        >
          logout
        </Button>
      </CardFooter>
    </Card>
  );
};
