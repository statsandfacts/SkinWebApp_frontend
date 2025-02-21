"use client"; // Ensure this runs on the client side
import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
const AccountDetailsUpdate = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    zipCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file)); // Show preview of the uploaded image
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated details:", formData);
    // Here, you can integrate an API call to save changes in the backend (FastAPI)
  };

  return (
    <div className=" top-15 left-0 w-full h-full grid place-items-center pt-7 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        {/* Left Side - Profile Picture & Save Button */}
        <div className="grid justify-center">
          {/* Profile Picture */}
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
              <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
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

          {/* Save Changes Button in the Footer */}
        </div>

        {/* Right Side - Form Fields */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* First Row - Full Name, DOB, Gender */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your full name"
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
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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

            {/* Second Row - Marital Status, ZIP Code */}
            <div>
              <label className="block text-sm font-medium">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
                className="w-full p-2 border rounded-md"
                placeholder="Enter your ZIP code"
                required
              />
            </div>
          </form>
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-sky-800 text-white px-6 py-4 rounded-md hover:bg-sky-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsUpdate;
