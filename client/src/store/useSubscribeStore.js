import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { subscribe } from "../../../server/src/controllers/subscribeController";

const useSubscribeStore = create((set, get) => ({
    subscribers: [],
    loading: false,

    subscribe: async (subscribeType, data) => {
        set({ loading: true })
        try {
            const res = await axiosInstance.post(`/subscribe/subscribe/${subscribeType}`, data);
            set((state) => ({
                subscribers: [...state.subscribers, { email: data.email }],
            }));
            toast.success(res.data.message);
        } catch (error) {
            // console.log("Error in getCategories: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false })
        }
    },

    unsubscribe: async (subscribeType, data) => {
        set({ loading: true })
        try {
            const res = await axiosInstance.post(`/subscribe/unsubscribe/${subscribeType}`, data);
            set((state) => ({
                subscribers: state.subscribers.filter(
                    (sub) => sub.email !== data.email
                ),
            }));
            toast.success(res.data.message);
        } catch (error) {
            // console.log("Error in getCategories: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false })
        }
    },

    getSubscribers: async (subscribeType, subscribeTo) => {
        set({ loading: true })
        try {
            const res = await axiosInstance.get(`/subscribe/get-subscribers/${subscribeType}/${subscribeTo}`);
            console.log("Subscribers fetched:", res.data.subscribers);
            set({ subscribers: res.data.subscribers });
        } catch (error) {
            // console.log("Error in getCategories: ", error);
            set({ subscribers: [] })
        } finally {
            set({ loading: false })
        }
    },

    resetSubscribers: () =>
        set({
            searchState: {
                loading: false,
                subscribers: [],
            },
    }),

}))

export default useSubscribeStore;