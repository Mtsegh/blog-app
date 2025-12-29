import { useEffect, useState } from "react";
import { Calendar, FileText } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import useBlogStore from "../../store/useBlogStore";
import useCategoryStore from "../../store/useCategoryStore";
import { BlogPreview, Loader2 } from "../../components";
import { Link, useParams } from "react-router-dom";


export default function TopicsInfoPage() {
  const { topicSlug } = useParams();
  const { blogs, getBlogs, isLoadingBlogs } = useBlogStore();
  const { getCategory, catInfo, loadingCat } = useCategoryStore();
  
  const [query, setQuery] = useState(`category=${catInfo?._id}`);

  useEffect(() => {
    getCategory(topicSlug);
    getBlogs(query);
  }, [topicSlug, getCategory]);

  if (loadingCat) return <loadingSpinner />;

  return (
    <div className="grid grid-cols-1 justify-center">
      <div className="relative h-40 w-full bg-ambr-100">
        <div className="flex bg-fuchsia-200 h-32 w-full justify-center">
          <img
              src={catInfo?.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
        </div>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="font-semibold text-4xl mb-4">{catInfo?.name}</h3>
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
        <div className="mt-4">
          <h3 className="text-2xl font-semibold flex gap-1.5 mb-2">About</h3>
          <p>{catInfo?.about}</p>
        </div>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="text-2xl font-semibold flex gap-1.5 mb-2">Stories<p className="text-gray-500">{`(${blogs.length})`}</p></h3>
        { isLoadingBlogs ? <Loader2 /> :
        blogs[0] ? <div className="flex flex-col size-full top-20 p-2">
            <div className='flex flex-row justify-evenly my-3 py-2'>
                <button onClick={() => setQuery(`author=${catInfo?._id}`)} className='btn story-nav'>All</button>
                <button onClick={() => setQuery(`author=${catInfo?._id}&latest-stories`)} className="story-nav">Trending</button>
                <button onClick={() => setQuery(`author=${catInfo?._id}&top-stories`)} className="story-nav">Top Stories</button>
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
            <p className="text-gray-500">No published stories yet</p>
          </div>}
      </div>
    </div>
  );
}
