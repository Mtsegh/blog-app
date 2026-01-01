import { useState, useEffect } from 'react'
import useCategoryStore from '../../store/useCategoryStore';
import useAuthStore from '../../store/useAuthStore';
import { BlogPreview, Loader2, LoadingSpinner } from '../../components';
import { Link } from 'react-router-dom';
import { formatPrettyDate } from '../../lib/formatDate';

function AllTopicsPage() {
  const { categories, getCategories, loadingCat } = useCategoryStore();
  
  const [activeBtn, setActiveBtn] = useState({
    drafts: true,
    pending: false,
    published: false,
  });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  
  return (
    <div className="flex flex-col size-full top-20 p-4 ">
      <div className='self-center w-full sm:w-150 mb-4'>
        <h1 className="text-xl font-bold my-5">Topics</h1>
        <div className='flex justify-end'>
          <Link
            to="/create-topic"
            className="self-end inline-flex items-center gap-1 bg-gray-900/10 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800/16 transition"
          >
            <span className="text-lg leading-none">+</span>
            Create Topic
          </Link>

        </div>
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
            ( (!categories || categories.length === 0) ?
              <div className="text-center p-6">
                No Topics Found
              </div> :
              categories.map((topics) => (
              <div className="flex border-b last:border-none border-gray-300 py-6" key={topics._id}>
                <div className="size-30 mr-6 overflow-hidden rounded-md shrink-0">
                  <img
                    src={topics.coverImage}
                    alt={topics.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className='flex flex-col'>
                  <Link key={topics._id} to={`/topics/${topics.slug}`} className='font-semibold hover:underline'>
                    {topics.name}
                  </Link>
                  <p className='text-sm my-1'>{topics.about}</p>
                  <p className='text-xs'>{formatPrettyDate(topics.updatedAt)}</p>
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

export default AllTopicsPage;