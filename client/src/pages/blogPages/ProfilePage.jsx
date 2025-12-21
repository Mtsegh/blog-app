import { Calendar, FileText, } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import useBlogStore from "../../store/useBlogStore";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { BlogPreview } from "../../components";
import { Link } from "react-router-dom";
import { formatPrettyDate } from "../../lib/formatDate";

export default function ProfilePage() {
  const { blogs, getBlogs, isLoadingBlogs } = useBlogStore();
  const { authUser } = useAuthStore();
  const [query, setQuery] = useState(`author=${authUser?._id}`);

  return (
    <div className="grid grid-cols-1 justify-center">
      <div className="relative h-40 w-full bg-ambr-100">
        <div className="flex bg-fuchsia-200 h-32 w-full justify-center">
          <img
              src={authUser?.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            {console.log("Cover Image: ", authUser?.coverImage)}
        </div>
        <div className="flex absolute rounded-full top-10 left-5 bg-amber-400 size-30 border-3 border-gray-50 justify-center items-center text-center">
          <img
              src={authUser?.profileImage}
              alt="Cover"
              className="w-full h-full object-cover rounded-full"
            />
        </div>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="font-semibold text-4xl mb-4">{authUser.fullname}</h3>
        <div className="flex">
          <div className="flex gap-2 flex-wrap">
            <li className="flex list-none">
              <Calendar className="size-6 text-gray-500" />
              <p className="text-gray-500 px-2">Joined September 2024</p>
            </li>
            <li className="flex list-none">
              <FileText className="size-6 text-gray-500" />
              <p className="text-gray-500 pl-2">300 Stories</p>
            </li>
          </div>
        </div>
        <p>About</p>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="text-2xl font-semibold flex gap-1.5 mb-2">Stories<p className="text-gray-500">{`(${blogs.length})`}</p></h3>
        { blogs[0] ? <div className="flex flex-col size-full top-20 p-2">
            <div className='flex flex-row justify-evenly my-3 py-2'>
                <button onClick={() => setQuery(`author=${authUser?._id}`)} className='btn story-nav'>All</button>
                <button onClick={() => setQuery(`author=${authUser?._id}`)} className="story-nav">Published</button>
                <button onClick={() => setQuery(`author=${authUser?._id}&drafts=true`)} className="story-nav">Drafts</button>
                <button onClick={() => setQuery(`author=${authUser?._id}&drafts=true`)} className="story-nav">Pending</button>
              </div>
              <div className='flex m-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8 max-w-7xl mx-auto bg-amber-100 p-5'>
                  {blogs.map((blog) => (
                      <Link key={blog._id} to={`/blog/${blog.slug}`}>
                      <BlogPreview blog={blog} />
                    </Link>
                  ))}
                </div>
              </div>
          </div> :
          <div>
            <p className="text-gray-500">{/* {authUser.fullName}  */} Phinehas Aondona has not published any stories</p>
          </div>}
      </div>
    </div>
  );
}
