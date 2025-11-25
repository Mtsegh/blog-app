import React from "react";

function BlogPreview({ blog, className = "" }) {
  const { coverImage, title, excerpt, category, views } = blog;

  return (
    <div
      className={`bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl overflow-hidden shadow-lg ${className} mx-4 sm:mx-6 my-8`}
    >
      {/* Cover Image Section */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
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
          <span className="capitalize">{category}</span>
          <span>{views} views</span>
        </div>
      </div>
    </div>

  );
}

export default BlogPreview;
