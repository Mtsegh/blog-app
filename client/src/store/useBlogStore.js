import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useBlogStore = create((set, get) => ({
    blogs: [],
    searchState: {
        isSearching: false,
        results: [],
        skip: 0,
    },
    isSavingBlog: false,
    isLoadingBlogs: false,
    isLoadingBlog: false,
    blogData: null,
    skip: 0,
    loading: false,

    createBlog: async (data) => {        
        set({ isSavingBlog: true });
        try {
            const res = await axiosInstance.post("/blogs/create-blog", data);
            set({ blogData: res.data })
            toast.success("Blog saved successfully");
            return res.data;
        } catch (error) {
            // console.log(error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isSavingBlog: false })
        }
    },
    updateBlog: async (data) => {        
        set({ isSavingBlog: true });
        try {
            const res = await axiosInstance.put("/blogs/edit-blog", data);
            set({ blogData: res.data })
            toast.success("Blog updated successfully");
            return res.data;
        } catch (error) {
            // console.log(error.message);
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
            // console.log(error.message);
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
            // console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoadingBlogs: false });
        }

    },

    getBlogs: async (param, useSkip) => {  
        const { skip, blogs, resetBlogStore } = get()
        set({ isLoadingBlogs: true });
        if (!useSkip) resetBlogStore();
        try {
            const res = await axiosInstance.get(`/blogs/get-blogs?skip=${useSkip ? skip : 0}&${param}`);
            if (useSkip) {
                set({ blogs:  [...blogs, ...res.data.blogs], skip: Number(res.data.skip) + 10 })
            } else {
                set({ blogs: res.data.blogs, skip: Number(res.data.skip) + 10 });
            }
            // toast.success("Blog saved successfully");
        } catch (error) {
            // console.log(error.message);
            // toast.error(error.response.data.message);
        } finally {
            set({ isLoadingBlogs: false });
        }

    },
    
    search: async (q, skip=false) => {
        if (!q || !q.trim()) return;

        const { searchState, resetSearch } = get();
        if (!skip) {
            resetSearch();
        }
        set({
            searchState: {
            ...searchState,
            isSearching: true,
            },
        });

        try {
            const res = await axiosInstance.get(
            `/blogs/search?q=${encodeURIComponent(q)}&skip=${searchState.skip}&limit=10&sortBy=${searchState.sortBy}`
            );

            if (res.data.success) set((state) => ({
                searchState: {
                    ...state.searchState,
                    results:
                    state.searchState.skip < 10
                        ? res.data.blogs
                        : [...state.searchState.results, ...res.data.blogs],
                    skip: res.data.skip + res.data.limit,
                    isSearching: false,
                },
            }));
            // console.log("Search response:", res.data, searchState);
        } catch (error) {
            console.error("Search error:", error.message);

            set((state) => ({
            searchState: {
                ...state.searchState,
                results: [],
                isSearching: false,
            },
            }));
        }
    },


    publishBlog: async (slug) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/blogs/publish-blog/${slug}`);
            set({ blogData: res.data.blog });
            toast.success(res.data.message);
        } catch (error) {
            // console.log(error.message);
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
            // console.log(error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }

    },

    likeBlog: async (slug) => {
        const initialLikedPosts = JSON.parse(
            localStorage.getItem("likedPosts") || "{}"
        );

        const likedPosts = (Array.isArray(initialLikedPosts) || typeof initialLikedPosts !== "object") ? {} : initialLikedPosts;
        
        const currentLikes = likedPosts[slug] ?? 0;

        if (currentLikes >= 100) return; // 🚫 max reached

        // optimistic update
        likedPosts[slug] = currentLikes + 1;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        const posts = JSON.parse(
            localStorage.getItem("likedPosts") || "{}"
        );
        

        try {
            await axiosInstance.patch(`/blogs/${slug}/like`);
        } catch (err) {
            // rollback
            likedPosts[slug] = currentLikes;
            localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
            throw err;
        }
    },

    getUserLikes: (slug) => {
        const likedPosts = JSON.parse(
            localStorage.getItem("likedPosts") || "{}"
        );
        // console.log("Liked Posts from localStorage: ", likedPosts);
        return likedPosts[slug] || 0;
    },


    resetBlogStore: () => {
        set({
            blogs: [], 
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

export default useBlogStore;