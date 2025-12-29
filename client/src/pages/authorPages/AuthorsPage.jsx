import { useState, useEffect } from 'react'
import useBlogStore from '../../store/useBlogStore';
import useAuthStore from '../../store/useAuthStore';
import { BlogPreview, Loader2, LoadingSpinner } from '../../components';
import { Link } from 'react-router-dom';
import profileIcon from "../../assets/profileIcon.jpg";
import useCategoryStore from '../../store/useCategoryStore';

function AuthorsPage() {
  const { authors, getAuthors, loadingCat } = useCategoryStore();
  const [activeBtn, setActiveBtn] = useState({
    drafts: true,
    pending: false,
    published: false,
  });

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  
  return (
    <div className="flex flex-col size-full top-20 p-4 ">
      <div className='self-center w-full sm:w-150 mb-4'>
        <h1 className="text-xl font-bold my-5">Our Authors</h1>
        <div className='flex flex-row gap-10 my-3 border-b border-gray-300 text-gray-500'>
            {/* <button className={`${activeBtn.drafts && 'border-b text-gray-900'} py-4`}
              onClick={() => {
                getBlogs(`author=${authUser?._id}&drafts=true`, false)
                setActiveBtn({drafts: true, pending: false, published: false})
              }
              }>Drafts</button>
            <button className={`${activeBtn.published  && 'border-b text-gray-900'} py-4`}
              onClick={() => {
                getBlogs(`author=${authUser?._id}`, false)
                setActiveBtn({drafts: false, pending: false, published: true})
              }
              }>Published</button>
            <button className={`nj ${activeBtn.pending  && 'border-b text-gray-900'} py-4`}
              onClick={() => {
                getBlogs(`author=${authUser?._id}&drafts=true`, false)
                setActiveBtn({drafts: false, pending: true, published: false})
              }
              }>Pending</button> */}
        </div>
        <div className='flex flex-col'>
          {loadingCat ? <Loader2 /> :
            ( (!authors || authors.length === 0) ?
            <div className="text-center p-6">
                No Authors Found
              </div> :
              authors.map((author) => (
                <div className="flex border-b last:border-none border-gray-300 py-6" key={author._id}>
                <div className="size-30 mr-6 overflow-hidden rounded-md flex-shrink-0">
                  <img
                    src={author?.profileImage || profileIcon}
                    alt={author?.fullname}
                    className="w-full h-full object-cover"
                    />
                </div>

                <div className='flex flex-col'>
                  <Link key={author?._id} to={`/authors/${author?.userSlug}`} className='font-semibold hover:underline'>
                    {author.fullname}
                  </Link>
                  <p className='text-sm my-1'>{author.bio}</p>
                  <p className='text-xs text-gray-500'>Published {author.publishedBlogs} Blogs</p>
                </div>
              </div>
              ))
            )            
          }
        </div>
      </div>
    </div>
  );
}

export default AuthorsPage;