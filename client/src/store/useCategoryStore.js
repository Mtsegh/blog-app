import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useCategoryStore = create((set, get) => ({
    categories: [],
    authors: [],
    catInfo: null,
    loadingCat: false,
    skip: 0,

    getCategories: async () => {
        set({ loadingCat: false })
        try {
            const res = await axiosInstance.get("/blogs/all-categories");
            set({ categories: res.data });
        } catch (error) {
            // console.log("Error in getCategories: ", error);
            set({ categories: null })
        } finally {
            set({ loadingCat: false })
        }
    },

    getCategory: async (slug) => {
        set({ loadingCat: false })
        try {
            const res = await axiosInstance.get(`/blogs/category/${slug}`);
            set({ catInfo: res.data });
        } catch (error) {
            // console.log("Error in getCategories: ", error);
            set({ catInfo: null })
        } finally {
            set({ loadingCat: false })
        }
    },

    addTopics: async (data) => {
        set({ loadingCat: false })
        try {
            const res = await axiosInstance.post("/blogs/create-topics", data);
            set({ catInfo: res.data.newTopic });
            toast.success("Blog saved successfully");
            return true
        } catch (error) {
            // console.log(error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ loadingCat: false })
        }
    },

    getAuthors: async () => {
        set({ loadingCat: true })
        try {
            const res = await axiosInstance.get("/auth/get-authors");
            set({ authors: res.data.users });
            // console.log("Authors fetched: ", res.data.users);
        } catch (error) {
            // console.log("Error in getAuthors: ", error);
            set({authors: null})
        } finally {
            set({ loadingCat: false })
        }
    },

    resetCatInfo: () => {
        set({
            catInfo: [], 
        });
    },

    resetSearch: () =>
        set({
            searchState: {
                isSearching: false,
                results: [],
                skip: 0,
                sortBy: "createdAt",
            },
    }),

}))

export default useCategoryStore;