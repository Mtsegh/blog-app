import { useEffect, useState } from "react";
import { BellOff, BellRing, Calendar, FileText } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import useBlogStore from "../../store/useBlogStore";
import useCategoryStore from "../../store/useCategoryStore";
import { BlogPreview, Loader2 } from "../../components";
import { Link, useParams } from "react-router-dom";
import { formatPrettyDate } from "../../lib/formatDate";
import useAuthStore from "../../store/useAuthStore";
import useSubscribeStore from "../../store/useSubscribeStore";


export default function TopicsInfoPage() {
  const { topicSlug } = useParams();
  const { blogs, getBlogs, isLoadingBlogs } = useBlogStore();
  const { getCategory, catInfo, loadingCat } = useCategoryStore();
  const { authUser, isLoading } = useAuthStore();
  const { subscribers, getSubscribers, unsubscribe, subscribe } = useSubscribeStore();
  
  const [query, setQuery] = useState(`category=${catInfo?._id}`);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getCategory(topicSlug);
  }, [topicSlug, getCategory]);
  
  useEffect(() => {
    if (catInfo?._id) {
      setQuery(`category=${catInfo._id}`);
    }
  }, [catInfo]);
  
  useEffect(() => {
    if (!catInfo?._id) return;
    getBlogs(query, false);
    getSubscribers('Topics', catInfo?._id);
  }, [catInfo, query]);

  useEffect(() => {
    setIsSubscribed(authUser?.email && subscribers.some(sub => sub.email === authUser.email));
  }, [subscribers, authUser]);
  
  if (loadingCat) return <loadingSpinner />;

  const toggleSubscribe = async () => {
    const subscribeType = "Topics";
    try {
      if (isSubscribed) {
        console.log("Subscribed", authUser.email)
        await unsubscribe(subscribeType, {
          email: authUser.email,
          subscribeTo: catInfo._id,
        });
      } else {
        await subscribe(subscribeType, {
          email: authUser.email,
          subscribeTo: catInfo._id,
        });
      }
    } catch (error) {
      toast.error("Failed to update subscription.");
    }
  };

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
        <h3 className="flex gap-4 font-semibold text-4xl mb-4">
          {catInfo?.name}
          {isSubscribed ? (
            <button
              onClick={toggleSubscribe}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xl py-1 px-2 rounded-lg flex items-center"
            >
              <BellOff className="size-5" />
              
            </button>
          ) : (
            <button
              onClick={toggleSubscribe}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xl py-1 px-2 rounded-lg flex items-center"
            >
              <BellRing className="size-6" />
            </button>
          )}
        </h3>
        <div className="flex">
          <div className="flex gap-2 flex-wrap">
            <li className="flex list-none">
              <Calendar className="size-6 text-gray-500" />
              <p className="text-gray-500 px-2">Active since {formatPrettyDate(catInfo?.createdAt)}</p>
            </li>
            <li className="flex list-none">
              <FileText className="size-6 text-gray-500" />
              <p className="text-gray-500 pl-2">Published Stories {blogs.length || 0}</p>
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
              <div className='flex m-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8 max-w-7xl mx-auto p-5'>
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
