import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/components/common/InputField";
import {
  fetchFamilyMembers,
  setCreateMemberModal,
} from "@/redux/slices/digitalPrescription/familyMembers.slice";
import dayjs from "dayjs";
import { createFamilyMember } from "@/services/api.digitalPrescription.service";
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

export default function CreateFamilyMemberModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { isCreateMemberModal } = useSelector(
    (state: any) => state.familyMember
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
          dob: values.dob,
          email: values.email,
        };

        const result = await createFamilyMember(payload);
        dispatch(fetchFamilyMembers(userId));
        toast.success("Family member added successfully!");
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
    ? dayjs().diff(dayjs(formik.values.dob), "year") < 18
    : false;

  const onClose = () => {
    dispatch(setCreateMemberModal(false));
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
              onChange={formik.handleChange}
              isLabel={true}
              value={formik.values.dob}
              type="date"
              name="dob"
              placeholder="Date of Birth"
              error={
                formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""
              }
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {isUnder18 && (
              <>
                <InputField
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
                {/* <label className="block text-sm font-medium text-gray-700">
                  Relation
                </label> */}
                <Select
                  name="relation"
                  label="Relation"
                  onChange={formik.handleChange}
                  value={formik.values.relation}
                  errorMessage={
                    formik.touched.relation && formik.errors.relation
                      ? formik.errors.relation
                      : ""
                  }
                >
                  <SelectItem value={"parent"} key={"parent"}>
                    Parent
                  </SelectItem>
                  <SelectItem value={"child"} key={"child"}>
                    Child
                  </SelectItem>
                  <SelectItem value={"inlaws"} key={"inlaws"}>
                    Inlaws
                  </SelectItem>
                  <SelectItem value={"spouse"} key={"spouse"}>
                    Spouse
                  </SelectItem>
                </Select>
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label> */}
                <Select
                  name="gender"
                  label="Gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  errorMessage={
                    formik.touched.gender && formik.errors.gender
                      ? formik.errors.gender
                      : ""
                  }
                >
                  <SelectItem value={"male"} key={"male"}>
                    Male
                  </SelectItem>
                  <SelectItem value={"female"} key={"female"}>
                    Female
                  </SelectItem>
                  <SelectItem value={"other"} key={"other"}>
                    Other
                  </SelectItem>
                </Select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
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
            Add Member
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
