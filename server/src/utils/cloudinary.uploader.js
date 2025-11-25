import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (blogPics) => {
    try {
        if (!blogPics || blogPics.length === 0) {
            throw new Error("No image provided")
        }

        const uploadPromise = blogPics.map(async (image) => {
            const result = await cloudinary.uploader.upload(image, { folder: "blog_images"});
            return result.secure_url;
        })

        const urls = await Promise.all(uploadPromise);

        return urls
    } catch (error) {
        console.log("Error in update saveBlogPics controller: ", error);
        throw new Error("Cloudinary uplaod failed: ", error.messae);
        
    }
}

export default uploadToCloudinary;