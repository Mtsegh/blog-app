import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore";
import useAuthStore from "../../store/useAuthStore";
import { LoadingSpinner } from "../../components";
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
    likeBlog
  } = useBlogStore();

  const [liked, setLiked] = useState(false);

  // Fetch Blog
  useEffect(() => {
    getBlog(slug);
  }, [getBlog, slug]);

  if (isLoadingBlog) return <LoadingSpinner />;

  if (!blogData || !blogData.title)
    return (
      <div className="w-full py-20 text-center text-xl text-red-500">
        Error loading blog. Try refreshing.
      </div>
    );

  const isAuthor = authUser && authUser._id === blogData.author._id;

  // Like button local toggle
  const handleLike = () => {
    setLiked(!liked);
    likeBlog(slug);
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-8 px-4 py-10">

      {/* LEFT — Sticky Author Tools / Actions */}
      <div className="hidden md:flex flex-col gap-4 sticky top-28 h-fit">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center group"
        >
          <Heart
            className={`size-7 transition-all duration-200 ${
              liked ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
          <span className="text-sm text-gray-600">{blogData.likes}</span>
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
              to={`/edit?slug=${slug}`}
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
              onClick={() => deleteBlog(slug)}
              className="flex flex-col items-center group"
            >
              <Trash2 className="size-6 text-red-500 group-hover:text-red-700" />
              <span className="text-xs text-red-500">Delete</span>
            </button>
          </>
        )}
      </div>

      {/* RIGHT — Blog Content */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {blogData.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={blogData.author.avatar || "/default-avatar.png"}
            alt="Author"
            className="size-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{blogData.author.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(blogData.publishedAt).toLocaleDateString()} •{" "}
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
          <div className="ql-editor">{parse(blogData.htmlContent)}</div>
        </div>

        {/* Bottom Like for mobile */}
        <div className="md:hidden flex gap-6 justify-center mt-10">
          <button onClick={handleLike} className="flex flex-col items-center">
            <Heart
              className={`size-7 transition-all duration-200 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
            <span className="text-sm text-gray-600">{blogData.likes}</span>
          </button>

          <button className="flex flex-col items-center">
            <Share2 className="size-6 text-gray-500" />
            <span className="text-xs text-gray-500">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
