import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Navigate } from "react-router-dom";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const useAuthStore = create((set, get) =>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isSavingChange: false,
    isLoading: false,
    authorInfo: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            // console.log("Fetched user profile:", res.data);
        } catch (error) {
            // console.log("Error in checkAuth: ", error);
            set({authUser: null})
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            // console.log(res.data);
            toast.success("Account created successfully");
        } catch (error) {
            // console.log(error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }

    },
    
    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data })
            toast.success(res.data.message);
            return true;
        } catch (error) {
            // console.log(error.response.data);
            toast.error(error.response.data.message)
            return false;
        } finally {
            set({ isLoggingIn: false })
        }

    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.patch("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("Profile updated successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    getAuthorProfile: async (userSlug) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get(`/auth/authors/${userSlug}`);
            set({ authorInfo: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    checkBookmarked: async (blogId) => {
        try {
            const res = await axiosInstance.get(`/auth/check-bookmark/${blogId}`);
            return res.data.bookmarked;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        }
    },

    sendResetLink: async (data) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/auth/forgot-password", data);
            set({ authUser: res.data })
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false })
        }
    },

    verifyEmail: async (data) => {
        set({ isLoading: true })
        // console.log(data, get().authUser.email);
        const info = {...data, email: get().authUser.email};
        try {
            const res = await axiosInstance.post("/auth/verify", info);
            set({ authUser: res.data.data })
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false })
        }
    },

    resetPassword: async (token, data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.patch(`/auth/reset-password/${token}`, data);
            toast.success(res.data.message);
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    toggleBookmarkStory: async (blogId) => {
        try {
            const res = await axiosInstance.post(`/auth/bookmarks-stories`, { blogId });
            toast.success(res.data.message);
            console.log("Bookmark status:", res.data.bookmarked);
            return res.data.bookmarked;
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        }
    },

}))

export default useAuthStore;