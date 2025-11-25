import { useState, useEffect } from 'react'
import useBlogStore from '../../store/useBlogStore'
import { LoadingSpinner } from '../../components';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const { isLoadingBlog, searchBlog, searchResults } = useBlogStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchBlog()
  }, [searchBlog]);

  if (isLoadingBlog) return <LoadingSpinner />;

  return (
    <div>
      <div>
        <div className='relative p-4'>
          <input
            className='input input-bordered w-full pl-10 bg-base-100/10'
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Enter search: category or tags'
          />
          <div className="absolute inset-y-0 left-0 z-50 pl-3 flex items-center pointer-events-none">
            <Search className="size-5 text-base-content/40" />
          </div>
        </div>
        <div>
          { searchResults[0] ?
            searchResults.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}>
                <BlogPreview blog={blog} />
              </Link>
            )) : <h1 className='text-center text-gray-400'>
                Blogs that match your search will apear here
              </h1>
          }
        </div>
      </div>
    </div>
  )
}
