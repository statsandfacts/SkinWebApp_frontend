"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slices/digitalPrescription/auth.slice";
import {
  updateUser,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { BadgeCheck } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@heroui/button";

const AccountDetailsUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    zipCode: "",
    email: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [uILoading, setUILoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userDetails) {
      setFormData((prev) => ({
        ...prev,
        fullName: userDetails.name || "",
        dob: userDetails.dob ? dayjs(userDetails.dob).format("YYYY-MM-DD") : "",
        gender: userDetails.gender || "",
        maritalStatus: userDetails.marital_status || "",
        zipCode: userDetails.zipcode || "",
        email: userDetails.email || "",
        profilePic: userDetails.user_profile_image_path || "",
      }));
    }
  }, [userDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("f_name", "profile_pictures");
      formData.append("files", file);
      formData.append("phone_no", userDetails?.phone_no);
      formData.append("doc_types", "profile_pictures");
      setUILoading(true);
      uploadImageToAws(formData)
        .then((response) => {
          const uploaded_file = response?.uploaded_files?.[0]?.file_url;
          if (!uploaded_file) {
            toast.error("File upload failed. Please try again.");
            return;
          }
          setFormData((prev) => ({
            ...prev,
            profilePic: uploaded_file || "",
          }));

          updateUser({
            user_id: userDetails?.user_id,
            user_profile_image_path: uploaded_file,
          })
            .then((response) => {
              toast.success(
                response.message || "User details updated successfully!"
              );
              dispatch(fetchUserDetails(userDetails?.user_id));
            })
            .catch((error) => {
              const errorMessage =
                error.response?.data?.message || "Failed to update profile.";
              toast.error(errorMessage);
            });
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Failed to upload image."
          );
        })
        .finally(() => {
          setUILoading(false);
        });
    } else {
      toast.warning("No file selected.");
      return;
    }
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.zipCode
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const payload = {
      user_id: userDetails?.user_id,
      name: formData.fullName,
      dob: dayjs(formData.dob).format("MM/DD/YYYY"),
      gender: formData.gender,
      zipcode: formData.zipCode,
      marital_status: formData.maritalStatus,
      email: formData.email,
      user_profile_image_path: formData.profilePic,
    };

    updateUser(payload)
      .then((response) => {
        toast.success(response.message || "User details updated successfully!");
        dispatch(fetchUserDetails(userDetails?.user_id));
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to update profile.";
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="top-15 left-0 w-full h-full grid place-items-center pt-9">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-center w-[70%]">
        {/* Profile Image Section */}
        <div className="grid justify-center">
          <div className="w-60 h-60 overflow-hidden border relative rounded-lg">
            {formData.profilePic ? (
              <Image
                src={formData.profilePic}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-60 h-60 bg-gray-200 text-gray-500">
                <User size={100} />
              </div>
            )}
          </div>
          <label className="mt-2 text-sky-800 cursor-pointer block text-center">
            {uILoading ? "Uploading ..." : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 flex items-center space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              {/* <div className="flex items-center justify-center h-full">
                <BadgeCheck
                  className="text-green-500 cursor-pointer mt-5"
                  size={32}
                />
              </div> */}
            </div>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="married">Married</option>
                <option value="unmarried">Unmarried</option>
                <option value="single">Single</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
          </form>

          <div className="mt-6 md:ml-16 md:w-60">
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit}
              className="text-white px-8 py-4 rounded-md w-full md:w-auto"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsUpdate;
