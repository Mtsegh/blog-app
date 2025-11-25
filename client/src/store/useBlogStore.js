import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useBlogStore = create((set, get) => ({
    categories: [],
    blogs: [],
    searchResults: [],
    isGettingCategories: false,
    isSavingBlog: false,
    isLoadingBlogs: false,
    isLoadingBlog: false,
    blogData: null,
    skip: 0,
    loading: false,

    getCategories: async () => {
        set({ isGettingCategories: false })
        try {
            const res = await axiosInstance.get("/blogs/all-categories");
            set({ categories: res.data });
        } catch (error) {
            console.log("Error in getCategories: ", error);
            set({ categories: null })
        } finally {
            set({ isGettingCategories: false })
        }
    },

    saveBlog: async (data) => {        
        set({ isSavingBlog: true });
        try {
            const res = await axiosInstance.post("/blogs/create-blog", data);
            set({ blogData: res.data })
            toast.success("Blog saved successfully");
            return res.data;
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isSavingBlog: false })
        }
    },

    getBlog: async (slug) => {        
        set({ isLoadingBlog: true });
        try {
            const res = await axiosInstance.get(`/blogs/blog/${slug}`);
            set({ blogData: res.data })
            // toast.success("Blog saved successfully");
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isLoadingBlog: false })
        }
    },

    getAllBlogs: async () => {        
        const { skip, blogs } = get()
        set({ isLoadingBlogs: true });
        try {
            const res = await axiosInstance.get(`/blogs/all-blogs?skip=${skip}`);
            set({ blogs:  [...blogs, ...res.data.blogs], skip: Number(res.data.skip) + 10 })
            // toast.success("Blog saved successfully");
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoadingBlogs: false });
        }

    },

    getBlogs: async (param) => {        
        const { skip, blogs } = get()
        set({ isLoadingBlogs: true });
        try {
            const res = await axiosInstance.get(`/blogs/get-blogs?skip=${skip}&${param}`);
            set({ blogs:  [...blogs, ...res.data.blogs], skip: Number(res.data.skip) + 10 })
            // toast.success("Blog saved successfully");
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoadingBlogs: false });
        }

    },
    
    searchBlogs: async () => {        
        const { skip, blogs } = get()
        set({ isSearching: true });
        try {
            const res = await axiosInstance.get(`/blogs/all-blogs?skip=${skip}`);
            set({ blogs: [...blogs, ...res.data.blogs], skip: Number(res.data.skip) + 10 });
            // toast.success("Blog saved successfully");
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isSearching: false });
        }

    },

    publishBlog: async (slug) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/blogs/publish-blog/${slug}`);
            set({ blogData: res.data.blog });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }

    },

    deleteBlog: async (slug) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/blogs/delete-blog/${slug}`);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }

    },

}))

export default useBlogStore;