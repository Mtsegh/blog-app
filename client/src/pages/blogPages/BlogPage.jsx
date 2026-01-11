import { use, useEffect, useState } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore";
import useAuthStore from "../../store/useAuthStore";
import { CommentSection, HeartBurst, LoadingSpinner, PopupLogin } from "../../components";
import parse from "html-react-parser";
import {
  Heart,
  Share2,
  Pencil,
  Trash2,
  CheckCircle,
  Bookmark
} from "lucide-react";

export default function BlogPage() {
  const { slug } = useParams();
  const location = useLocation();
  const { authUser, toggleBookmarkStory, checkBookmarked } = useAuthStore();

  const {
    getBlog,
    isLoadingBlog,
    blogData,
    publishBlog,
    deleteBlog,
    likeBlog,
    hasLikedBlog,
  } = useBlogStore();

  const [userLikes, setUserLikes] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [burstKey, setBurstKey] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  // Fetch Blog
  useEffect(() => {
    getBlog(slug);
  }, [getBlog, slug]);

  useEffect(() => {
    if (!blogData) return;
    
    setLikesCount(blogData.likes || 0);
    const fetchUserLikes = async () => {
      if (!authUser) {
        setUserLikes(0);
        return;
      }
      const likes = await hasLikedBlog(blogData.slug);
      if (likes === 1) setBurstKey((prev) => !prev);
      setUserLikes(likes);
    };
    fetchUserLikes();
  }, [blogData]);

  useEffect(() => {
    if (!blogData) return;
    const checkBookmarkStatus = async () => {
      if (!authUser) return;
      const isBlogBookmarked = await checkBookmarked(blogData._id);
      setIsBookmarked(isBlogBookmarked);
      console.log("Bookmark status on load:", isBlogBookmarked);
    };
    checkBookmarkStatus();
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
    if (!authUser) {
      setShowLogin(true);
      return;
    }
    if (userLikes > 0) return; // already liked
    const likes = await likeBlog(slug);
    if (likes === 1) setBurstKey((prev) => !prev); // trigger burst animation
    setUserLikes((prev) => prev + likes);
  };



  const handleDeletedBlog = async () => {
    const res = await deleteBlog(slug);
    if (res) {
      <Navigate to={"/dashboard"} replace />
    }
  };

  const share = async () => {
    const shareData = {
      title: blogData.title,
      text: blogData.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  const toggleBookmark = async () => {
    if (!authUser) {
      setShowLogin(true);
      return;
    }
    setIsBookmarked((prev) => !prev);
    const isBookmarked = await toggleBookmarkStory(blogData._id);
    if (isBookmarked === null) {
      setIsBookmarked((prev) => !prev);
      return; // error occurred
    }
    console.log("Bookmark status:", isBookmarked);
    setIsBookmarked(isBookmarked);
  };


  return (
    <div className="relative flex gap-8 py-10">
      <PopupLogin
        open={showLogin}
        redirectTo={location.pathname}
        onClose={() => setShowLogin(false)}
      />
      {console.log("Blog Data:", authUser, showLogin)}

      {/* LEFT — Sticky Author Tools / Actions */}
      <div className="hidden md:flex items-center flex-col pl-4 gap-4 sticky top-28 h-fit">
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
        
        <button
          onClick={toggleBookmark}
          className="flex flex-col items-center group"
        >
          <div className="relative">
            <Bookmark
              className={`size-7 transition-transform duration-150 ${
                isBookmarked
                  ? "text-gray-700 fill-gray-600 scale-110"
                  : "text-gray-400"
              }`}
            />
          </div>
        </button>
        

        {/* Share Button */}
        <button onClick={share} className="flex flex-col items-center group">
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
        <div className="">
            <CommentSection blogId={blogData?._id} authUser={authUser} setShowLogin={setShowLogin} />
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
        <button
          onClick={toggleBookmark}
          className="flex items-center"
        >
          <div className="relative">
            <Bookmark
              className={`size-7 transition-transform duration-150 ${
                isBookmarked
                  ? "text-gray-700 fill-gray-600 scale-110"
                  : "text-gray-400"
              }`}
            />
          </div>
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
        <button onClick={share} className="flex flex-col items-center">
          <Share2 className="size-6 text-gray-500 dark:text-gray-100" />
          <span className="text-xs text-gray-500 dark:text-gray-100">Share</span>
        </button>
      </div>
    </div>
  );
}
