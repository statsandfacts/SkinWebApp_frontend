import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";



import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/components/common/InputField";
import {
  FamilyMembersState,
  fetchFamilyMembers,
  setCreateMemberModal,
  setSingleMember,
} from "@/redux/slices/digitalPrescription/familyMembers.slice";
import dayjs from "dayjs";
import {
  createFamilyMember,
  updateFamilyMember,
} from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { AppDispatch } from "@/redux/store";

interface FamilyMemberFormValues {
  name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  relation: string;
}

interface CreateFamilyMemberModalProps {
  actionKey?: string;
}

export default function CreateFamilyMemberModal({
  actionKey = "create",
}: CreateFamilyMemberModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { isCreateMemberModal, memberDetail } = useSelector(
    (state: { familyMember: FamilyMembersState }) => state.familyMember
  );
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FamilyMemberFormValues = {
    name: "",
    email: "",
    phone_number: "",
    dob: "",
    gender: "",
    relation: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").optional(),
    phone_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .optional(),
    dob: Yup.date().required("Date of Birth is required").nullable(),
    gender: Yup.string().required("Gender is required"),
    relation: Yup.string().required("Relation is required"),
  });

  const formik = useFormik<FamilyMemberFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          user_id: userId,
          member_name: values.name,
          relation: values.relation,
          gender: values.gender,
          phone_no: values.phone_number,
          dob: dayjs(values.dob, "YYYY-MM-DD").format("DD-MM-YYYY"),
          email: values.email,
        };

        // if (dayjs().diff(dayjs(formik.values.dob), "year") > 18) {
        //   toast.info("Working on progress(18+ user).");
        //   return;
        // }

        if (actionKey === "create") {
          const result = await createFamilyMember(payload);
        } else if (actionKey === "edit") {
          const result = await updateFamilyMember({
            ...payload,
            family_member_id: memberDetail?.family_member_id,
          });
        }

        dispatch(fetchFamilyMembers(userId));
        toast.success(
          `Family member ${
            actionKey === "edit" ? "updated" : "added"
          } successfully!`
        );
        onClose();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isUnder18 = formik.values.dob
    ? dayjs().diff(dayjs(formik.values.dob), "year") > 18
    : false;

  useEffect(() => {
    if (memberDetail) {
      formik.setValues({
        name: memberDetail.member_name || "",
        email: memberDetail.email || "",
        phone_number: memberDetail.phone_no || "",
        dob: memberDetail.dob || "",
        gender: memberDetail.gender || "",
        relation: memberDetail.relation || "",
      });
    }
  }, [memberDetail]);

  const onClose = () => {
    dispatch(setCreateMemberModal(false));
    dispatch(setSingleMember(null));
    formik.resetForm();
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isCreateMemberModal}
      onOpenChange={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add Family Member
        </ModalHeader>
        <ModalBody>
          <form
            autoComplete="off"
            className="flex flex-col justify-center gap-3 w-full h-full max-w-md px-5 mt-3"
            onSubmit={formik.handleSubmit}
          >
            <InputField
              disabled={actionKey === "view"}
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.name}
              type="text"
              name="name"
              placeholder="Name"
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <InputField
              disabled={actionKey === "view"}
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.dob}
              type="date"
              name="dob"
              placeholder="Date of Birth"
              error={
                formik.touched.dob && formik.errors.dob ? formik.errors.dob :""
              }
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {isUnder18 && (
              <>
                <InputField
                  disabled={actionKey === "view"}
                  onChange={formik.handleChange}
                  isLabel={true}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  error={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <InputField
                  disabled={actionKey === "view"}
                  onChange={formik.handleChange}
                  isLabel={true}
                  value={formik.values.phone_number}
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  error={
                    formik.touched.phone_number && formik.errors.phone_number
                      ? formik.errors.phone_number
                      : ""
                  }
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </>
            )}

            <div className="grid grid-cols-2 gap-2 w-full">
              <div>
                <Select
                  isDisabled={actionKey === "view"}
                  name="relation"
                  label="Relation"
                  // onChange={formik.handleChange}
                  onSelectionChange={(key) =>
                    formik.setFieldValue("relation", key.currentKey)
                  }
                  value={formik.values.relation}
                  selectedKeys={[formik.values.relation]}
                  errorMessage={
                    formik.touched.relation && formik.errors.relation
                      ? formik.errors.relation
                      : ""
                  }
                >
                  <SelectItem key={"parent"}>Parent</SelectItem>
                  <SelectItem key={"child"}>Child</SelectItem>
                  <SelectItem key={"inlaws"}>Inlaws</SelectItem>
                  <SelectItem key={"spouse"}>Spouse</SelectItem>
                </Select>
              </div>

              <div>
                <Select
                  isDisabled={actionKey === "view"}
                  name="gender"
                  label="Gender"
                  // onChange={formik.handleChange}
                  onSelectionChange={(key) =>
                    formik.setFieldValue("gender", key.currentKey)
                  }
                  value={formik.values.gender}
                  selectedKeys={[formik.values.gender]}
                  errorMessage={
                    formik.touched.gender && formik.errors.gender
                      ? formik.errors.gender
                      : ""
                  }
                >
                  <SelectItem key={"male"}>Male</SelectItem>
                  <SelectItem key={"female"}>Female</SelectItem>
                  <SelectItem key={"other"}>Other</SelectItem>
                </Select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {actionKey !== "view" && (
            <>
              <Button
                className="rounded-lg"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                className="rounded-lg"
                color="primary"
                onPress={() => formik.handleSubmit()}
                isLoading={isLoading}
              >
                {actionKey === "edit" ? "Update" : "Add Member"}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
