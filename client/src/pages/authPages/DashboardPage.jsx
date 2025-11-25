import { useState, useEffect } from 'react'
import useBlogStore from '../../store/useBlogStore';
import useAuthStore from '../../store/useAuthStore';
import { BlogPreview, LoadingSpinner } from '../../components';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const { blogs, getBlogs, isLoadingBlogs } = useBlogStore();
  const { authUser } = useAuthStore();
  const [query, setQuery] = useState(`author=${authUser?._id}`);

  useEffect(() => {
    getBlogs(query);
  }, [getBlogs, query]);

  if (isLoadingBlogs) return <LoadingSpinner />;

  if (!blogs || blogs.length === 0)
    return <div className="min-h-dvh text-center p-6 sm:text-3xl lg:text-4xl">No blogs found. Check back later.</div>;

  return (
    <div className="flex flex-col size-full top-20 p-4 ">
      <div className='min-w-dvh flex flex-row justify-between my-3 py-2'>
        <button onClick={() => setQuery(`author=${authUser?._id}`)} className='btn'>All</button>
        <button onClick={() => setQuery(`author=${authUser?._id}`)}>Published</button>
        <button onClick={() => setQuery(`author=${authUser?._id}&drafts=true`)}>Drafts</button>
        <button onClick={() => setQuery(`author=${authUser?._id}&drafts=true`)}>Pending</button>
      </div>
      <div>
        {blogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog.slug}`}>
            <BlogPreview blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;