import { FC, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  FamilyMembersState,
  fetchFamilyMembers,
  setCreateMemberModal,
  setSingleMember,
} from "@/redux/slices/digitalPrescription/familyMembers.slice";
import { useDispatch, useSelector } from "react-redux";
import CreateFamilyMemberModal from "../CreateFamilyMemberModal";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { AppDispatch } from "@/redux/store";
import Loader from "@/components/Loader";
import { Eye, PencilLine } from "lucide-react";

const AddFamilyMembers: FC = () => {
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
      <Card>
        <CardHeader>
          <div className="flex justify-end w-full">
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
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>

      <CreateFamilyMemberModal actionKey={actionKey} />
    </>
  );
};

export default AddFamilyMembers;
