import { BellOff, BellRing, Calendar, FileText, UserCheck, Users, } from "lucide-react";
import { toast } from "react-hot-toast"; // make sure toast is imported
import useBlogStore from "../../store/useBlogStore";
import { use, useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { BlogPreview, Loader2, LoadingSpinner } from "../../components";
import { Link, useParams } from "react-router-dom";
import profileIcon from "../../assets/profileIcon.jpg";
import { formatPrettyDate } from "../../lib/formatDate";
import useSubscribeStore from "../../store/useSubscribeStore";

export default function ProfilePage() {
  const { userSlug } = useParams();
  const { blogs, getBlogs, isLoadingBlogs } = useBlogStore();
  const { authorInfo, getAuthorProfile, isLoading, authUser } = useAuthStore();
  const { subscribers, getSubscribers, unsubscribe, subscribe } = useSubscribeStore();
  const [query, setQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAuthorProfile, setIsAuthorProfile] = useState(false);

  // Fetch author
  useEffect(() => {
    if (!userSlug) return;
      getAuthorProfile(userSlug);
    }, [userSlug]);
    
    // Update query when author loads
  useEffect(() => {
      if (authorInfo?._id) {
        setQuery(`author=${authorInfo._id}`);
        getSubscribers('User', authorInfo?._id);
      }
    }, [authorInfo]);
    
  // Fetch blogs when query changes
  useEffect(() => {
    if (!query) return;
      getBlogs(query);
  }, [query]);

  useEffect(() => {
    if (authorInfo && (authUser?.email !== authorInfo?.email)) {
      setIsSubscribed(authUser?.email && subscribers.some(sub => sub.email === authUser.email));
      setIsAuthorProfile(false);
      return;
    }
    setIsAuthorProfile(true);
  }, [subscribers, authUser, authorInfo]);

  if (isLoading) return <LoadingSpinner />;

  const toggleSubscribe = async () => {
    const subscribeType = "User";
    try {
      if (isSubscribed) {
        console.log("Subscribed", authUser.email)
        await unsubscribe(subscribeType, {
          email: authUser.email,
          subscribeTo: authorInfo._id,
        });
      } else {
        await subscribe(subscribeType, {
          email: authUser.email,
          subscribeTo: authorInfo._id,
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
              src={authorInfo?.coverImage || null}
              alt="Cover"
              className="w-full h-full object-cover"
            />
        </div>
        <div className="flex absolute rounded-full top-10 left-5 bg-amber-400 size-30 border-3 border-gray-50 justify-center items-center text-center">
          <img
              src={authorInfo?.profileImage || profileIcon}
              alt="Cover"
              className="w-full h-full object-cover rounded-full"
            />
        </div>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="font-semibold text-4xl mb-4 capitalize gap-3 flex">
          {authorInfo?.fullname}
          {!isAuthorProfile && (isSubscribed ? (
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
          ))}
        </h3>
        <div className="flex">
          <div className="flex gap-2 flex-wrap">
            <li className="flex list-none">
              <Calendar className="size-6 text-gray-500" />
              <p className="text-gray-500 pl-2 pr-3">Joined {formatPrettyDate(authorInfo?.createdAt)}</p>
            </li>
            <li className="flex list-none">
              <FileText className="size-6 text-gray-500" />
              <p className="text-gray-500 pl-2 pr-3">{authorInfo?.no_of_blogs || 0} Stories</p>
            </li>
            <li className="flex list-none">
              <Users className="size-6 text-gray-500" />
              <p className="text-gray-500 pl-2">{subscribers.length || 0} Subscribers</p>
            </li>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-semibold flex gap-1.5 mb-2">About</h3>
          <p>{authorInfo?.bio}</p>
        </div>
      </div>
      <div className="flex flex-col px-4 my-0 py-4">
        <h3 className="text-2xl font-semibold flex gap-1.5 mb-2">Stories<p className="text-gray-500">{`(${blogs.length})`}</p></h3>
        { isLoadingBlogs ? <Loader2 /> : blogs[0] ? <div className="flex flex-col size-full top-20 p-2">
            <div className='flex flex-row justify-evenly my-3 py-2'>
                
              </div>
              <div className='flex m-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8 max-w-10xl mx-auto lg:p-5'>
                  {blogs.map((blog) => (
                      <Link key={blog._id} to={`/blog/${blog.slug}`}>
                      <BlogPreview blog={blog} />
                    </Link>
                  ))}
                </div>
              </div>
          </div> :
          <div>
            <p className="text-gray-500">{/* {author.fullName}  */} Phinehas Aondona has not published any stories</p>
          </div>}
      </div>
    </div>
  );
}
