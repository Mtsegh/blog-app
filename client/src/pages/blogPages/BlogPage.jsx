import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore";
import useAuthStore from "../../store/useAuthStore";
import { HeartBurst, LoadingSpinner } from "../../components";
import parse from "html-react-parser";
import {
  Heart,
  Share2,
  Pencil,
  Trash2,
  CheckCircle,
  Loader2
} from "lucide-react";

export default function BlogPage() {
  const { slug } = useParams();
  const { authUser } = useAuthStore();

  const {
    getBlog,
    isLoadingBlog,
    blogData,
    publishBlog,
    deleteBlog,
    likeBlog,
    hasLikedPost,
  } = useBlogStore();

  const [userLikes, setUserLikes] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [burstKey, setBurstKey] = useState(0);


  // Fetch Blog
  useEffect(() => {
    getBlog(slug);
  }, [getBlog, slug]);

  useEffect(() => {
    if (!blogData) return;

    setLikesCount(blogData.likes || 0);
    setUserLikes(useBlogStore.getState().getUserLikes(blogData.slug));
  }, [blogData]);



  if (isLoadingBlog) return <LoadingSpinner />;

  if (!blogData || !blogData.title)
    return (
      <div className="w-full py-20 text-center text-xl text-red-500">
        Error loading blog. Try refreshing.
      </div>
    );

  const isAuthor = authUser && authUser._id === blogData?.author?._id;

  const handleLike = async () => {
    if (userLikes >= 100) return;

    setBurstKey((k) => k + 1); // 🔥 retrigger animation
    setUserLikes((prev) => prev + 1);
    setLikesCount((prev) => prev + 1);

    try {
      await likeBlog(slug);
    } catch (err) {
      setUserLikes((prev) => prev - 1);
      setLikesCount((prev) => prev - 1);
    }
  };



  const handleDeletedBlog = async () => {
    const res = await deleteBlog(slug);
    if (res) {
      <Navigate to={"/dashboard"} replace />
    }
  };



  return (
    <div className="max-w-6xl mx-auto flex gap-8 py-10">
      {/* LEFT — Sticky Author Tools / Actions */}
      <div className="hidden md:flex flex-col gap-4 sticky top-28 h-fit">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center group"
        >
          <div className="relative">
            <HeartBurst burstKey={burstKey} />
            <Heart
              className={`size-7 transition-transform duration-150 ${
                userLikes > 0
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400"
              }`}
            />
          </div>
          <span className="text-sm text-gray-600">{likesCount}</span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center group">
          <Share2 className="size-6 text-gray-500 group-hover:text-primary transition" />
          <span className="text-xs text-gray-500">Share</span>
        </button>

        {/* Author ONLY Controls */}
        {isAuthor && (
          <>
            <Link
              to={`/edit-story/${slug}`}
              className="flex flex-col items-center group"
            >
              <Pencil className="size-6 text-blue-500 group-hover:text-blue-700" />
              <span className="text-xs text-blue-500">Edit</span>
            </Link>

            {!blogData.published ? (
              
              <button
                onClick={() => publishBlog(slug)}
                className="flex flex-col items-center group"
              >
                <CheckCircle className="size-6 text-green-600 group-hover:text-green-700" />
                <span className="text-xs text-green-600">Publish</span>
              </button>
            ) : null}

            <button
              onClick={handleDeletedBlog}
              className="flex flex-col items-center group"
            >
              <Trash2 className="size-6 text-red-500 group-hover:text-red-700" />
              <span className="text-xs text-red-500">Delete</span>
            </button>
          </>
        )}
      </div>

      {/* RIGHT — Blog Content */}
      <div className="flex-1 mx-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {blogData.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={blogData.author.profileImage || "../../assets/profileIcon.jpg"}
            alt="Author"
            className="size-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{blogData?.author.fullname}</p>
            <p className="text-sm text-gray-500">
              {new Date(blogData.updatedAt).toLocaleDateString()} •{" "}
              {blogData.readTime || "5 min read"}
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full mb-6">
          <img
            src={blogData.coverImage}
            alt={blogData.title}
            className="rounded-xl shadow-md w-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="ql-editor">{parse(blogData?.htmlContent)}</div>
        </div>

        {/* Bottom Like for mobile */}
      </div>
      <div className="md:hidden bottom-0 fixed bg-white dark:bg-gray-800 flex gap-6 justify-around mt-10 w-full h-16 items-center p-2 border-t border-gray-300">
        <button onClick={handleLike} className="flex gap-1 items-center">
          <div className="relative">
            <HeartBurst burstKey={burstKey} />
            <Heart
              className={`size-7 transition-transform duration-150 ${
                userLikes > 0
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400"
              }`}
            />
          </div>
          <span className="text-md text-gray-600 dark:text-gray-200">{likesCount}</span>
        </button>
        {isAuthor && (
          <>
            <Link
              to={`/edit-story/${slug}`}
              className="flex flex-col items-center group"
            >
              <Pencil className="size-6 text-blue-500 group-hover:text-blue-700" />
              <span className="text-xs text-blue-500">Edit</span>
            </Link>

            {!blogData.published ? (
              
              <button
                onClick={() => publishBlog(slug)}
                className="flex flex-col items-center group"
              >
                <CheckCircle className="size-6 text-green-600 group-hover:text-green-700" />
                <span className="text-xs text-green-600">Publish</span>
              </button>
            ) : null}

            <button
              onClick={handleDeletedBlog}
              className="flex flex-col items-center group"
            >
              <Trash2 className="size-6 text-red-500 group-hover:text-red-700" />
              <span className="text-xs text-red-500">Delete</span>
            </button>
          </>
        )}
        <button className="flex flex-col items-center">
          <Share2 className="size-6 text-gray-500 dark:text-gray-100" />
          <span className="text-xs text-gray-500 dark:text-gray-100">Share</span>
        </button>
      </div>
    </div>
  );
}
