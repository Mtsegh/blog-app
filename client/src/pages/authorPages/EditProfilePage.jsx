import React, { useState } from "react";
import { InputField } from "../../components";
import useAuthStore from "../../store/useAuthStore";
import { ImagePlus, Loader2, Mail, Trash2, User } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  
  const [profileChanged, setProfileChanged] = useState(false);
  const [coverChanged, setCoverChanged] = useState(false);

  const [coverPreview, setCoverPreview] = useState(authUser?.coverImage || "");
  const [profilePreview, setProfilePreview] = useState(authUser?.profileImage || "");
  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    email: authUser?.email || "",
    coverImage: authUser?.coverImage || "",
    profileImage: authUser?.profileImage || ""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updates = {};

    if (formData.fullname !== authUser.fullname)
      updates.fullname = formData.fullname;

    if (formData.bio !== authUser.bio)
      updates.bio = formData.bio;

    if (profileChanged)
      updates.profileImage = formData.profileImage;

    if (coverChanged)
      updates.coverImage = formData.coverImage;

    const success = await updateProfile(updates);
    if (success) {
      navigate(`/profile`);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverChanged(true);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);

    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = async () => {
        setFormData({ ...formData, coverImage: reader.result });
    };
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileChanged(true)
    const url = URL.createObjectURL(file);
    setProfilePreview(url);

    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = async () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
  };

  const deleteProfileImg = () => {
    setProfilePreview("");
    setFormData({ ...formData, profileImage: "" });
  }
  
  const deleteCoverImg = () => {
    setCoverPreview("");
    setFormData({ ...formData, coverImage: "" });
  }

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    return true;
  };

  // ✅ Detect if user changed name or userSlug
  const isChanged = () => {
    return (
      formData.fullname.trim() !== authUser?.fullname ||
      formData.bio.trim() !== authUser?.bio || formData.profileImage !== authUser?.profileImage ||
      formData.coverImage !== authUser?.coverImage
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
          <button
          onClick={handleSubmit}
          disabled={!isChanged() || isUpdatingProfile}
          className={`border border-gray-700 px-3 m-4 py-1 rounded-md 
            ${isChanged() ? "hover:bg-yellow-400 cursor-pointer" : "opacity-40 cursor-not-allowed"}
          `}
        >
          Save Changes
        </button>
        </div>
      </header>
      <div className="relative h-40 md:h-55 w-full">
        <div className="flex bg-gray-100 h-32 md:h-40 w-full justify-center">
          {coverPreview &&
            <img
              src={coverPreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          }
          <div className="flex gap-2 absolute h-32 md:h-40 w-full justify-center items-center text-gray-700 text-sm hover:opacity-90">
            <label
              htmlFor="coverInput"
              className="flex size-15 bg-white/55 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center"
            >
              <ImagePlus /> 
            </label>
            <div
              onClick={deleteCoverImg}
              className={`size-15 bg-white/55 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center ${coverPreview ? 'flex' : 'hidden' }`}
            >
              <Trash2 /> 
            </div>
            <input
              type="file"
              id="coverInput"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>
        </div>
        <div className="flex absolute rounded-full top-3/10 left-5 bg-gray-50 size-30 border-4 border-white">
          {profilePreview &&
            <img
              src={profilePreview}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          }
          <div className="flex gap-1 absolute w-28 h-28 rounded-full overflow-hidden justify-center items-center text-center">
            <label
              htmlFor="profileInput"
              className="flex size-10 bg-gray-300/60 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center"
            >
              <ImagePlus />
            </label>
            <div
              onClick={deleteProfileImg}
              className={`size-10 bg-gray-300/60 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center ${profilePreview ? 'flex' : 'hidden' }`}
            >
              <Trash2 />
            </div>

            <input
              type="file"
              id="profileInput"
              accept="image/*"
              className="hidden"
              onChange={handleProfileChange}
              />
          </div>
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
                maxLength={400}
                onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
            }
                />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isChanged() || isUpdatingProfile}
          >
            {isUpdatingProfile ? (
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
