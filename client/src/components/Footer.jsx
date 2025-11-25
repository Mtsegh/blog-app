

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 flex flex-col py-8'>
        <div className='flex justify-center p-3'>
            <li className="size-10 bg-amber-500 list-none mx-5 text-center items-center justify-center">
                <a href="http://" className="bg-green-300">
                    <img src="" alt="fb"/>
                </a>
            </li>
            <li className="size-10 bg-amber-500 list-none mx-5 text-center items-center justify-center">
                <a href="http://">
                    <img src="" alt="inst"/>
                </a>
            </li >
            <li className="size-10 bg-amber-500 list-none mx-5 text-center items-center justify-center">
                <a href="http://">
                    <img src="" alt="tw"/>
                </a>
            </li>
        </div>
        <div className="flex flex-col justify-center items-center py-1 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-center mt-2">

                <Link to="/explore" className="whitespace-nowrap hover:underline text-base">
                    Explore
                </Link>

                <Link to="/contact" className="whitespace-nowrap hover:underline text-base">
                    Contact
                </Link>

                <Link to="/privacy-policy" className="whitespace-nowrap hover:underline text-base">
                    Privacy Policy
                </Link>

                <Link to="/terms-of-use" className="whitespace-nowrap hover:underline text-base">
                    Terms of Use
                </Link>

                <Link to="/support" className="whitespace-nowrap hover:underline text-base">
                    Support
                </Link>

            </div>

            <div className="w-full py-2 text-center text-sm text-gray-500">
                &copy; 2026 GettyStories. All rights reserved
            </div>
        </div>
    </footer>
  )
}
