"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slices/digitalPrescription/auth.slice";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { BadgeCheck } from 'lucide-react';


const AccountDetailsUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    zipCode: "",
    email:"",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user details when the component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  // Populate form fields when userDetails updates
  useEffect(() => {
    if (userDetails) {
      setFormData({
        fullName: userDetails.name || "",
        dob: userDetails.dob || "",
        gender: userDetails.gender || "",
        maritalStatus: userDetails.maritalStatus || "",
        zipCode: userDetails.zipCode || "",
        email:userDetails.email||"",
      });
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
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      date_of_birth: formData.dob,
      gender: formData.gender,
      zipcode: formData.zipCode,
    };

    try {
      const response = await updateUser(payload);

      if (response?.success) {
        toast.success(response.message || "Profile updated successfully!");
        console.log(response);
      } else {
        toast.error(response?.message || "Failed to update profile.");
        console.log(response);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-15 left-0 w-full h-full grid place-items-center pt-9">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-center w-[70%]">
        {/* Profile Image Section */}
        <div className="grid justify-center">
          <div className="w-60 h-60 overflow-hidden border relative rounded-lg">
            {profilePic ? (
              <Image
                src={profilePic}
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
          <label className="mt-2 text-blue-600 cursor-pointer block text-center">
            Upload
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
      <div className="flex items-center justify-center h-full">
        <BadgeCheck className="text-green-500 cursor-pointer mt-5" size={32} />
      </div>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Single">Single</option>
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

          {/* Save Changes Button - Positioned Below Form Fields */}
          <div className="mt-6 md:ml-16 md:w-60">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-primary-600 text-white px-8 py-4 rounded-md hover:bg-primary-600 w-full md:w-auto"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsUpdate;
