import React from "react";
import { formatPrettyDate } from "../lib/formatDate";
import profileIcon from "../assets/profileIcon.jpg";
import { Link, useNavigate } from "react-router-dom";

function BlogPreview({ blog, className = "" }) {
  const navigate = useNavigate();

  const {
    coverImage,
    title,
    excerpt,
    category,
    views,
    author: { fullname, userSlug, profileImage },
    updatedAt,
  } = blog;

  return (
    <article
      className={`
        group relative overflow-hidden rounded-xl
        bg-background/80 backdrop-blur-sm
        shadow-sm hover:shadow-xl
        transition-all duration-500
        ${className}
      `}
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <img
          src={coverImage || "/placeholder.jpg"}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Story title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2
            className="
              text-lg sm:text-xl font-semibold
              text-white leading-snug
              line-clamp-2
              drop-shadow-md
            "
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Excerpt */}
        {excerpt && (
          <p
            className="
              text-sm sm:text-base
              text-muted-foreground
              leading-relaxed
              line-clamp-3
            "
          >
            {excerpt}
          </p>
        )}

        {/* Author + Meta */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div
            onClick={() => navigate(`/profile/${userSlug}`)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={profileImage || profileIcon}
              alt={fullname}
              className="
                size-10 rounded-full object-cover
                ring-1 ring-border/50
              "
            />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {fullname}
              </span>
              <span className="text-muted-foreground">
                {formatPrettyDate(updatedAt)}
              </span>
            </div>
          </div>

          <span className="text-muted-foreground">
            {views} views
          </span>
        </div>

        {/* Topic */}
        <div className="pt-2 border-t border-border/40">
          <span
            className="
              text-xs sm:text-sm uppercase tracking-wide
              text-muted-foreground
            "
          >
            Puublished in {category?.name} Stories
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogPreview;
