"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CreateUser, login } from "@/services/api.digitalPrescription.service";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  setPharmacyUserId,
  setTermConditionModal,
  setUser,
} from "@/redux/slices/digitalPrescription/auth.slice";
import Link from "next/link";
import TermsAndConditionsModal from "@/components/DigitalPrescription/Auth/TermsAndConditionsModal";

const SignUpThroughPharmacy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pharmacyId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_no: "",
      last_name: "",
      email: "",
      dob: "",
      gender: "",
      marital_status: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phone_no: Yup.string()
        .required("Phone number is required")
        .min(10, "Phone number must be at least 10 digits"),
      email: Yup.string().email("Invalid email format").nullable(),
      dob: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future")
        .nullable(),
      gender: Yup.string().nullable(),
      marital_status: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { name, email, phone_no, dob, gender, marital_status } = values;

      try {
        const payload = {
          name,
          email: email ? email : null,
          phone_no,
          user_type: "patient",
          dob: dob ? dayjs(dob).format("DD/MM/YYYY") : null,
          gender: gender || null,
          marital_status: marital_status || null,
        };

        const createUserResponse = await CreateUser(payload);
        const payloadLogin = {
          user_role: "1",
          email_or_phone_no: phone_no,
          session_id: new Date().getTime().toString(),
        };

        const loginResponse = await login(payloadLogin);
        const userId = loginResponse.user_id;
        toast.success("User Signup successful!");
        dispatch(setUser({ userId, sessionId: payloadLogin.session_id }));
        dispatch(setPharmacyUserId(pharmacyId));
        router.replace("/upload-prescription/prescriptions");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.detail || "Something went wrong";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col gap-3">
        <form
          autoComplete="off"
          className="flex flex-col justify-center gap-3 w-full max-w-md px-5 mt-3"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          />

          <InputField
            onChange={formik.handleChange}
            isLabel={true}
            value={formik.values.phone_no}
            type="text"
            name="phone_no"
            placeholder="Phone"
            error={
              formik.touched.phone_no && formik.errors.phone_no
                ? formik.errors.phone_no
                : ""
            }
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          />

          <InputField
            onChange={formik.handleChange}
            isLabel={true}
            value={formik.values.email}
            type="email"
            name="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          />

          <div className="w-full flex gap-3">
            <Select
              name="gender"
              label="Gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
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

            <Select
              name="marital_status"
              label="Marital Status"
              onChange={formik.handleChange}
              value={formik.values.marital_status}
            >
              <SelectItem value={"single"} key={"single"}>
                Single
              </SelectItem>
              <SelectItem value={"married"} key={"married"}>
                Married
              </SelectItem>
              <SelectItem value={"separated"} key={"separated"}>
                Separated
              </SelectItem>
            </Select>
          </div>

          <Button
            color="primary"
            className="w-full rounded-lg"
            variant="solid"
            type="submit"
            isLoading={isLoading}
            endContent={<ArrowRightIcon className="w-4 h-4" />}
          >
            Submit
          </Button>
        </form>
        <div className="flex justify-center items-center max-w-md px-6">
          <Checkbox defaultSelected />
          <div className="text-sm">
            By Creating an account I agree to the{" "}
            <span
              className="font-semibold hover:underline text-sky-900"
              onClick={() => dispatch(setTermConditionModal(true))}
            >
              Terms and Conditions
            </span>{" "}
            and{" "}
            <Link
              href="/policy"
              className="font-semibold text-sm hover:underline text-sky-900"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <TermsAndConditionsModal />
    </>
  );
};

export default SignUpThroughPharmacy;
