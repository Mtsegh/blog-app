
export default function ErrorComp() {
  return (
    <>
      <div className='bg-orange-700 w-full p-6 text-white mb-2'>
        <p>Something went wrong. <a href="/contact" className='underline hover:no-underline'>Help us improve</a></p>
      </div>
      <div className="h-25 text-center p-6 sm:text-1xl ">No blogs found. Try refreshing the page. <a href='#' onClick={(e) => {
        e.preventDefault();
        window.location.reload(true);
      }} className='underline text-blue-500 hover:no-underline hover:text-blue-600'>Refresh</a></div>
    </>
  )
}
