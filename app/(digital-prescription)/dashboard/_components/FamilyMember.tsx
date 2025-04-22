"use client";
import BackButton from "@/components/common/BackButton";
import CreateFamilyMemberModal from "@/components/DigitalPrescription/Details/CreateFamilyMemberModal";
import Loader from "@/components/Loader";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  FamilyMembersState,
  fetchFamilyMembers,
  setCreateMemberModal,
  setSingleMember,
} from "@/redux/slices/digitalPrescription/familyMembers.slice";
import { AppDispatch } from "@/redux/store";
import { Button } from "@heroui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Eye, PencilLine, PlusIcon, UserPlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FamilyMember = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { familyMembers } = useSelector(
    (state: { familyMember: FamilyMembersState }) => state.familyMember
  );

  const [actionKey, setActionKey] = useState<string>("");

  useEffect(() => {
    if (!familyMembers.data || familyMembers.data.length <= 0) {
      dispatch(fetchFamilyMembers(userId));
    }
  }, [dispatch]);

  const EditFamilyMember = (data: any, key: string) => {
    setActionKey(key);
    dispatch(setSingleMember(data));
    dispatch(setCreateMemberModal(true));
  };
  return (
    <>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
          <BackButton />
        </div>
        <div className="w-full bg-gray-50 rounded-lg shadow-sm shadow-red-100 p-6 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl cursor-pointer">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex justify-center items-center">
              <UserPlusIcon className="w-10 h-10 text-sky-600 transition-all duration-300 transform animate-bounce" />
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-700">
              Manage Your Family Members
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Easily manage your family members here for quick access.
            </div>
            <div className="mt-2">
              <Button
                color="primary"
                className="rounded-lg"
                onPress={() => {
                  setActionKey("create");
                  dispatch(setCreateMemberModal(true));
                }}
              >
                Add Family Member
                <PlusIcon className="h-5 w-5" />{" "}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-sm sm:max-w-5xl overflow-auto w-full mt-4">
          {familyMembers.loading ? (
            <Loader />
          ) : familyMembers.errorMessage ? (
            <p className="text-red-500 ml-3">
              {" "}
              Error: {familyMembers.errorMessage}{" "}
            </p>
          ) : familyMembers.data.length > 0 ? (
            <Table removeWrapper aria-label="Family Members Table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Date of Birth</TableColumn>
                <TableColumn>Relation</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {familyMembers.data.map((member: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="capitalize">
                      {member?.member_name}
                    </TableCell>
                    <TableCell>{member?.dob}</TableCell>
                    <TableCell>{member?.relation}</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button
                          onClick={() => EditFamilyMember(member, "edit")}
                          className="flex items-center gap-1 text-slate-500"
                        >
                          <p className="font-medium">Edit</p>
                          <PencilLine className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => EditFamilyMember(member, "view")}
                          className="flex items-center gap-1 text-slate-500"
                        >
                          <p className="font-medium">View</p>
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center">
              <p className="py-2 px-6 bg-slate-100 w-fit rounded-full text-sm text-slate-500">
                No family members found.
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateFamilyMemberModal actionKey={actionKey} />
    </>
  );
};

export default FamilyMember;
