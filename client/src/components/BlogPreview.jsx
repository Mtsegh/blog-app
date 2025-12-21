import React from "react";
import { formatPrettyDate } from "../lib/formatDate";

function BlogPreview({ blog, className = "" }) {
  const { coverImage, title, excerpt, category, views, author, updatedAt } = blog;
  

  return (
    <div
      className={`bg-gray-800 hover:bg-gray-700 transition-all rounded-md overflow-hidden shadow-lg ${className}`}
    >
      {/* Cover Image Section */}
      <div className="relative w-full aspect-[12/9] overflow-hidden">
        <img
          src={coverImage || "/placeholder.jpg"}
          alt={title || "Blog cover"}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Optional: Text overlay on image */}
        <div className="absolute bottom-4 left-4">
          <h2 className="text-white text-lg sm:text-xl font-semibold drop-shadow-md line-clamp-2">
            {title}
          </h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 text-white">
        {excerpt && (
          <p className="text-sm sm:text-base text-gray-300 mb-3 line-clamp-3">
            {excerpt}
          </p>
        )}

        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-2">
          <div className="flex capitalize">
            <div className="flex pr-1">
              <img src={ "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-template-x9_719432-1315.jpg?semt=ais_hybrid"} className="size-10 rounded-full bg-amber-50" />
            </div>
            <div className="flex flex-col">
              <p>{author}</p>
              <p>{formatPrettyDate(updatedAt)}</p>
            </div>
          </div>
          <span>{views} views</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-2">
          <span className="capitalize">Published in {category} Stories</span>
        </div>
      </div>
    </div>

  );
}

export default BlogPreview;
