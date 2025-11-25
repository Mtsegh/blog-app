import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const useAuthStore = create((set, get) =>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isSavingChange: false,
    isLoading: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
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
            toast.success("Account created successfully");
        } catch (error) {
            console.log(error.message);
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
            toast.success("Loggged in successfully");
        } catch (error) {
            console.log(error.response.data);
            
            toast.error(error.response.data.message)
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
            const res = await axiosInstance.post("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false })
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


}))

export default useAuthStore;