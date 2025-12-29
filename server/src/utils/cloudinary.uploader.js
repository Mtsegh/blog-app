import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (
  images,
  { folder = "blogs/content", publicIdPrefix = "" } = {}
) => {
  if (!images || images.length === 0) {
    throw new Error("No images provided");
  }

  try {
    const uploads = images.map((image, index) =>
      cloudinary.uploader.upload(image, {
        folder,
        public_id: publicIdPrefix
          ? `${publicIdPrefix}_${index}`
          : undefined,
        overwrite: true,
        resource_type: "image",
      })
    );

    const results = await Promise.all(uploads);

    return results.map((file) => (
      file.secure_url
      // publicId: file.public_id,
    ));
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw new Error("Cloudinary upload failed");
  }
};

export const deleteImagesFromCloudinary = async (publicIds = []) => {
  if (!publicIds.length) return;

  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
    throw new Error("Cloudinary delete failed");
  }
};
