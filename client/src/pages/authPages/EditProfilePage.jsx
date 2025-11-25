import React, { useState } from "react";
import { InputField } from "../../components";
import useAuthStore from "../../store/useAuthStore";
import { Loader2, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditProfilePage() {
  const { signup, isSavingChange, authUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    username: authUser?.bio || "",
    email: authUser?.email || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signup(formData);
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.bio.trim()) return toast.error("Username is required");
    return true;
  };

  // ✅ Detect if user changed name or username
  const isChanged = () => {
    return (
      formData.fullname.trim() !== authUser?.fullname ||
      formData.bio.trim() !== authUser?.bio
    );
  };

  return (
    <div className="grid grid-cols-1 justify-center">
      <header className="fixe flex justify-between h-15 items-center border-b bg-amber-300 border-base-300 w-full top-0 z-50 backdrop-blur-lg">
        <Link to="/profile" className="flex gap-1.5 px-5 m-0">
          <ChevronLeft />
          <p>Back to my profile</p>
        </Link>

        <div>
          <button className="border-1 border-gray-600 m-4 px-2 py-1 rounded-md hover:bg-yellow-400 hover:cursor-pointer">Save Changes</button>
        </div>
      </header>
      <div className="relative h-40 w-full bg-ambr-100">
        <div className="flex bg-fuchsia-200 h-32 w-full justify-center">

        </div>
        <div className="flex absolute rounded-full top-10 left-5 bg-amber-400 size-30 border-3 border-gray-50 justify-center items-center text-center">
          <img src="" alt="my pic" />
        </div>
      </div>
      <div className="flex flex-col w-full px-4 my-0 py-4 lg:items-center">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 lg:w-200 justify-center">
        <h3 className="font-semibold text-2xl mb-4 self-start">Tell us about yourself</h3>
          <InputField
            label="Email"
            Icon={Mail}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled
          />

          <InputField
            label="Full Name"
            Icon={User}
            type="text"
            placeholder="Paula Paul"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />

          <div className={`form-control`}>
            <label className="label flex justify-between">
                <span className="label-text font-medium text-gray-800 uppercase">Bio</span>
                <span className="text-gray-900 text-sm bg-gray-100 p-1 rounded-lg">Optional</span>
            </label>
            <p className="text-sm text-gray-600">This is the first thing people will see on your page. Give them a compelling reason to read from you.</p>
            <div className="relative">
              <textarea
                className="textarea w-full h-35"
                placeholder="Start writing..."
                value={formData.bio}
                onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
            }
                />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isChanged() || isSavingChange}
          >
            {isSavingChange ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Saving...
              </>
            ) : isChanged() ? (
              "Save Changes"
            ) : (
              "No Changes"
            )}
          </button>
        </form>
      </div>
      
    </div>
  );
}
