import React, { useEffect } from 'react';
import { BlogPreview, ErrorComp, LoadingSpinner } from '../../components';
import useBlogStore from '../../store/useBlogStore';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const { blogs, getAllBlogs, isLoadingBlogs } = useBlogStore();

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  if (isLoadingBlogs) return <LoadingSpinner />;

  if (!blogs || blogs.length === 0) {
    return <div>
      <ErrorComp />
    </div>
  }   

  return (
    <div className="flex flex-1 size-full top-20 p-4 ">
      <div className='flex m-3'>
        {blogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog.slug}`}>
            <BlogPreview blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
}
