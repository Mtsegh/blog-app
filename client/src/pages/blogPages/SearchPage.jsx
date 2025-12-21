import { useState } from "react";
import useBlogStore from "../../store/useBlogStore";
import { InputField, LoadingSpinner } from "../../components";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const { searchState, search } = useBlogStore();
  const { isSearching, results } = searchState;
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!searchText.trim()) return;
    search(searchText);
  };

  return (
    <div className="flex w-full min-h-dvh bg-amber-50">
      <div className="flex flex-col gap-7 w-full max-w-4xl mx-auto p-6">

        {/* Search Input */}
        <div className="flex">
          <InputField
            style="w-full"
            type="search"
            value={searchText}
            Icon={Search}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by title, tags, category or author"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-amber-300 px-4 ml-2 rounded-md hover:bg-amber-400"
            disabled={isSearching}
          >
            Search
          </button>
        </div>

        {/* Results */}
        {isSearching && <LoadingSpinner />}
        {!isSearching && results?.length === 0 && (
          <div className="text-center text-gray-500">
            No results found. Try different keywords.
          </div>
        )}

        {!isSearching &&
          results?.map((blog) => (
            <div
              key={blog._id}
              className="flex border-b border-gray-300 py-6"
            >
              <div className="size-28 mr-6 overflow-hidden rounded-md">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="font-semibold text-lg hover:underline"
                >
                  {blog.title}
                </Link>
                <p className="text-sm my-1">{blog.excerpt}</p>
                <p className="text-xs text-gray-500">
                  {new Date(blog.updatedAt).toDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
