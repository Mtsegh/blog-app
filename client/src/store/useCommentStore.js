import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useCommentStore = create((set, get) => ({
  comments: [],
  isLoading: false,
  no_of_comments: 0,

  // 🧾 Get comments for a blog
  getComments: async (blogId) => {
    if (!blogId) return;

    try {
      set({ isLoading: true });
        const res = await axiosInstance.get(`/comments/get-comments/${blogId}`);
      set({ comments: res.data.comments, no_of_comments: res.data.no_of_comments || 0 });
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      set({ isLoading: false });
    }
  },

  // ➕ Add comment
  addComment: async (blogId, payload) => {
    try {
        console.log("Adding comment to blogId:", blogId, payload);
      const res = await axiosInstance.post(`/comments/add-comment/${blogId}`, payload);

      set(state => ({
        comments: [res.data.comment, ...state.comments],
      }));

      return res.data.comment;
    } catch (error) {
      toast.error("Failed to add comment");
      throw error;
    }
  },

  // 🗑️ Delete comment
  deleteComment: async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/delete/${commentId}`);

      set(state => ({
        comments: state.comments.filter(c => c._id !== commentId),
      }));
      return true;
    } catch (error) {
      toast.error("Failed to delete comment");
      return false;
    }
  },

  // 🧹 Optional: clear comments (useful on page change)
  clearComments: () => set({ comments: [] }),
}));

export default useCommentStore;
