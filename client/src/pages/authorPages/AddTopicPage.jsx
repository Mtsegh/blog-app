import React, { useState } from "react";
import { InputField } from "../../components";
import { ImagePlus, Loader2, PenBoxIcon, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCategoryStore from "../../store/useCategoryStore";

function AddTopic() {
  const navigate = useNavigate();
  const { addTopics, loadingCat } = useCategoryStore();

  const [coverChanged, setCoverChanged] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    about: "",
    coverImage: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await addTopics(formData);
    if (success) {
      navigate("/topics");
    }
  };
  
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverChanged(true);

    const url = URL.createObjectURL(file);
    setCoverPreview(url);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, coverImage: reader.result }));
    };
  };

  const deleteCoverImg = () => {
    setCoverPreview("");
    setFormData((prev) => ({ ...prev, coverImage: "" }));
    setCoverChanged(false);
  };

  // ---------- validation ----------
  const validateForm = () => {
    if (!formData.name.trim())
      return toast.error("Topic name is required");

    if (!formData.about.trim())
      return toast.error("Topic description is required");

    if (!formData.coverImage)
      return toast.error("Cover image is required");

    return true;
  };

  // ---------- detect change ----------
  const isChanged = () => {
    return (
      formData.name.trim() ||
      formData.about.trim() ||
      coverChanged
    );
  };

  // ---------- UI ----------
  return (
    <div className="grid grid-cols-1 justify-center">
      <header className="fixed flex justify-between h-15 items-center border-b bg-amber-300 dark:bg-[#130f00] border-base-300 w-full top-0 z-50 backdrop-blur-lg">
        <Link to="/topics" className="flex gap-1.5 px-5 m-0">
          <ChevronLeft />
          <p>Back to topics</p>
        </Link>

        <div>
          <button
            onClick={handleSubmit}
            disabled={!isChanged() || loadingCat}
            className={`border border-gray-700 px-3 m-4 py-1 rounded-md 
              ${isChanged()
                ? "hover:bg-yellow-400 cursor-pointer"
                : "opacity-40 cursor-not-allowed"}
            `}
          >
            Save Topic
          </button>
        </div>
      </header>

      {/* COVER IMAGE — unchanged */}
      <div className="relative h-40 md:h-55 w-full">
        <div className="flex bg-gray-100 h-42 md:h-50 w-full justify-center">
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}

          <div className="flex gap-2 absolute h-42 md:h-50 w-full justify-center items-center text-gray-700 text-sm hover:opacity-90">
            <label
              htmlFor="coverInput"
              className="flex size-15 bg-white/55 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center"
            >
              <ImagePlus />
            </label>

            <div
              onClick={deleteCoverImg}
              className={`size-15 bg-white/55 hover:bg-white/80 cursor-pointer rounded-full justify-center items-center ${
                coverPreview ? "flex" : "hidden"
              }`}
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
      </div>

      {/* FORM — unchanged layout */}
      <div className="flex flex-col w-full px-4 my-0 py-4 lg:items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 lg:w-200 justify-center"
        >
          <h3 className="font-semibold text-2xl mb-4 self-start">
            Create a new topic
          </h3>

          <InputField
            label="Topic Name"
            type="text"
            placeholder="Technology"
            value={formData.name}
            Icon={PenBoxIcon}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <div className="form-control">
            <label className="label flex justify-between">
              <span className="label-text font-medium text-gray-800 dark:text-gray-200 uppercase">
                About
              </span>
              <span className="text-gray-900 dark:text-gray-200 text-sm dark:bg-gray-900 bg-gray-100 p-1 rounded-lg">
                Required
              </span>
            </label>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Briefly describe what this topic is about.
            </p>

            <textarea
              className="textarea w-full h-35"
              placeholder="Start writing..."
              maxLength={400}
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isChanged() || loadingCat}
          >
            {loadingCat ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Creating...
              </>
            ) : isChanged() ? (
              "Create Topic"
            ) : (
              "No Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTopic;