import { FC } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import { setCreateMemberModal } from "@/redux/slices/digitalPrescription/familyMembers.slice";
import { useDispatch } from "react-redux";
import CreateFamilyMemberModal from "./CreateFamilyMemberModal";

interface FamilyMember {
  id: number;
  name: string;
  email: string;
  number: string;
}

const familyMembers: FamilyMember[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    number: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    number: "098-765-4321",
  },
];

const AddFamilyMembers: FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-end w-full">
            <Button
              color="primary"
              onPress={() => {
                dispatch(setCreateMemberModal(true));
              }}
            >
              Add Family Member
              <PlusIcon className="h-5 w-5" />{" "}
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table removeWrapper aria-label="Family Members Table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Number</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {familyMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.number}</TableCell>
                  <TableCell>
                    <ToolTipBtn
                      onClick={() => {}}
                      title="View Details"
                      key={member.id}
                    >
                      <InformationCircleIcon className="h-5 w-5" />
                    </ToolTipBtn>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <CreateFamilyMemberModal />
    </>
  );
};

export default AddFamilyMembers;
