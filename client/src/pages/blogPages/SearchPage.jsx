import { useEffect, useState, useRef } from "react";
import useBlogStore from "../../store/useBlogStore";
import { InputField, LoadingSpinner } from "../../components";
import { Search, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const { searchState, search, resetSearch } = useBlogStore();
  const { isSearching, results, query } = searchState;

  const [searchText, setSearchText] = useState("");
  const debounceRef = useRef(null);

  // 🔹 Debounced search
  useEffect(() => {
    if (!searchText.trim()) {
      resetSearch();
      return
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      search(searchText);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [searchText, search]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    if (searchText === query) return;
    search(searchText);
  };

  const loadMore = () => {
    search(searchText, true);
  };

  return (
    <div className="min-h-dvh w-full bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">

        {/* 🔍 Search Box */}
        <div className="sticky top-4 z-10 bg-background/80 backdrop-blur rounded-xl p-4 shadow-sm">
          <div className="flex gap-2">
            <InputField
              style="w-full"
              type="search"
              value={searchText}
              Icon={Search}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search blogs, tags, authors…"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 rounded-lg bg-primary text-primary-foreground h-10 justify-center self-end hover:opacity-90 disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </div>

        {/* ⏳ Loading */}
        {isSearching && (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        )}

        {/* ❌ Empty State */}
        {!isSearching && results.length === 0 && searchText && (
          <div className="text-center text-muted-foreground py-20">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-2">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* 📄 Results */}
        {!isSearching && results.length > 0 && (
          <div className="space-y-6">
            {results.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group flex gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg leading-tight group-hover:underline">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(blog.updatedAt).toDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ⬇ Load More */}
        {!isSearching && results.length >= 10 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-6 py-2 rounded-full border hover:bg-muted transition"
            >
              Load more
              <ArrowDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
