import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/components/common/InputField";
import { setCreateMemberModal } from "@/redux/slices/digitalPrescription/familyMembers.slice";

interface FamilyMemberFormValues {
  name: string;
  email: string;
  phone_number: string;
  zip_code: string;
  dob: string;
}

export default function CreateFamilyMemberModal() {
  const dispatch = useDispatch();
  const { isCreateMemberModal } = useSelector(
    (state: any) => state.familyMember
  );
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    dispatch(setCreateMemberModal(false));
  };

  const initialValues: FamilyMemberFormValues = {
    name: "",
    email: "",
    phone_number: "",
    zip_code: "",
    dob: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    zip_code: Yup.string().required("Zip code is required"),
    dob: Yup.date().required("Date of Birth is required").nullable(),
  });

  const formik = useFormik<FamilyMemberFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const payload = { ...values };

        // Handle form submission logic here

        toast.success("Family member added successfully!");
        resetForm();
        setIsLoading(false);
        onClose();
      } catch (error: any) {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    },
  });

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
            <div className="flex gap-2 justify-between w-full">
              <InputField
                onChange={formik.handleChange}
                isLabel={true}
                value={formik.values.dob}
                type="date"
                name="dob"
                placeholder="Date of Birth"
                error={
                  formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : ""
                }
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <InputField
                onChange={formik.handleChange}
                isLabel={true}
                value={formik.values.zip_code}
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                error={
                  formik.touched.zip_code && formik.errors.zip_code
                    ? formik.errors.zip_code
                    : ""
                }
                onBlur={formik.handleBlur}
                className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
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
