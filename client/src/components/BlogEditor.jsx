import { Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { formats, modules } from "../lib/utils";
import useBlogStore from "../store/useBlogStore";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function BlogEditor({ content: initialContent, formData: initialFormData }) {
    const { quill, quillRef } = useQuill({
        modules: modules,
        formats: formats
    })
    const navigate = useNavigate()
    const { isSavingBlog, createBlog, updateBlog, categories } = useBlogStore()

    const [initialized, setInitialized] = useState(false);
    const [imageName, setImageName] = useState(<p className="text-gray-400">Select cover photo</p>);
    const [content, setContent] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        base64Img: "",
        selectedCategory: "Select Category",
        tags: "",
        slug: "",
    });

    useEffect(() => {
        if (!quill) return;

        const handler = () => {
            setContent(quill.root.innerHTML);
        };

        quill.on("text-change", handler);

        return () => {
            quill.off("text-change", handler);
        };
    }, [quill]);



    useEffect(() => {
        if (!initialized && initialFormData) {
            console.log(initialFormData);
            
            setImageName(<p className="text-gray-400">Change cover photo</p>);
            setFormData(initialFormData);
            setInitialized(true);
        }
    }, [initialFormData, initialized]);


    useEffect(() => {
        if (quill && initialContent) {
            quill.root.innerHTML = initialContent;
            setContent(initialContent);
        }
    }, [quill, initialContent]);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setImageName(file.name);
        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onload = async () => {
            const base64Image = reader.result;
            setFormData({ ...formData, base64Img: base64Image })
            // await updateProfile({ profileImage: base64Image });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!formData.title.trim()) return toast.error("Title is required");
        // if (!categories.includes(formData.selectedCategory)) return toast.error("Select valid category");
        if (!formData.tags.trim()) return toast.error("At least one tag required");
        if (!content) return toast.error("Blog body should not be empty");
        
        const blogPayload = {
            title: formData.title,
            htmlContent: content,
            coverImage: formData.base64Img,
            category: formData.selectedCategory,
            tags: formData.tags,
            slug: formData.slug,
        };

        const isEdit = Boolean(initialContent);
        let savedBlog;
        if (isEdit) {
            savedBlog = await updateBlog(blogPayload);
        } else {
            savedBlog = await createBlog(blogPayload);
        }
        
        if (savedBlog?.slug) navigate(`/blog/${savedBlog.slug}`);
    }

    return (
        <div className="pt-20">
        <h2 className="text-4xl text-center font-semibold py-4">
            Getty stories Editor
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
            {/* Blog Editor */}
            <div className="w-full max-w-3xl p-5 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                Blog Editor
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                    >
                        Blog Title
                    </label>
                    <div className="mt-2">
                    <input
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                        value={formData.title}
                        required
                        id="title"
                        autoComplete="given-name"
                        className="input block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder="Type the Course title"
                    />
                    </div>
                </div>
                {/* Cover Image */}
                <div className="sm:col-span-2">
                    <p className="block text-sm font-medium leading-6 text-gray-900 mb-2 cursor-default">Cover Image</p>
                    <label
                    htmlFor="cover-image"
                    >                    
                    <div className="mt-2 h-10 block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 cursor-pointer hover:bg-gray-100">
                        {imageName}
                    <input
                        // onChange={(e) => setSlug(e.target.value)}
                        type="file"
                        id="cover-image"
                        className="hidden"
                        accept="image/*"
                        name="cover-image"
                        onChange={(e) => handleImageUpload(e)}
                    />
                    </div>
                    </label>
                </div>
                {/* Category */}
                <div className="sm:col-span-2">
                    <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Select Category
                    </label>
                    <select
                        id="description"
                        onChange={(e) => setFormData({ ...formData, selectedCategory: e.target.value })}
                        value={formData.selectedCategory}
                        className={`select ${"block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"}`}
                        placeholder="Write your thoughts here..."
                    >
                        <option disabled>Select Category</option>
                        {categories.map((category) => { 
                            return <option key={category._id} value={category.category}>
                                {category.category}
                            </option>})}
                    </select>
                </div>
                {/* Content */}
                <div className="sm:col-span-2">
                    <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Blog Content
                    </label>
                    <div className="w-1xl h-5xl">
                        <div id="content" ref={quillRef} />
                        <div id="toolbar" />
                    </div>
                </div>
                {/* Tags */}
                <div className="sm:col-span-2 mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                        Add blog tags
                    </label>
                    <div className="mt-2">
                    <input
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        type="text"
                        value={formData.tags}
                        id="tag"
                        autoComplete="given-name"
                        className="input block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder="Add at least one tag"
                    />
                    </div>
                </div>
                </div>

                
                <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                disabled={isSavingBlog}>
                {isSavingBlog ? (
                    <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                    </>
                ) : (
                    <>
                        <Plus className="w-5 h-5 mr-2" />
                        <span>Save Blog Post</span>
                    </>
                )}
                </button>
            </form>
            </div>

            {/* Blog View */}
            <div className=" blog-view w-full max-w-3xl p-8 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
                <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                    Blog View
                </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                    <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                        Blog Title
                    </h2>
                    <div className="mt-2">
                        <p className="text-3xl font-bold">{formData.title}</p>
                    </div>
                </div>
                {/* Slug */}
                <div className="sm:col-span-2">
                    <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                        Blog Image
                    </h2>
                    <div className="mt-2">
                        {formData.base64Img !== "" ? <img src={formData.base64Img} /> : "" }
                    </div>
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Story Category
                    </h2>
                    <p>{formData.selectedCategory}</p>
                </div>
                <div className="sm:col-span-full">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Blog Content
                    </h2>
                    <div className="ql-editor">{parse(content)}</div>                    
                </div>
                <div className="sm:col-span-full">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Blog tags
                    </h2>
                    <p className="ql-editor">{formData.tags}</p>                    
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
