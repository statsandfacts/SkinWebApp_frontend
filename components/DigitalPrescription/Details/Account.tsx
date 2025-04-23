"use client";
import { logOutUser } from "@/redux/slices/digitalPrescription/auth.slice";
import { resetPrescription } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { resetFamilyMember } from "@/redux/slices/digitalPrescription/familyMembers.slice";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Account = () => {
  const router= useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    dispatch(resetPrescription());
    dispatch(resetFamilyMember())
    router.push("/");
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardHeader>
            <div className="flex justify-start w-full">
              <Button color="danger" variant="light" onPress={handleLogout}>
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" /> Logout
              </Button>
            </div>
          </CardHeader>
        </CardBody>
      </Card>
    </>
  );
};

export default Account;
