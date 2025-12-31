import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../../assets/pen.svg";
import { LogIn, Settings, ChevronDown, ChevronUp, Search } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();
  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  function FastNavLinkTag({ link, name }) {
    return (
      <Link
        to={`/${link}`}
        className="text-[1em] text-gray-700 hover:text-gray-950 my-2 mx-1 px-2 justify-center"
      >
        {name}
      </Link>
    );
  }

  return (
    <header className="relative border-b border-base-300 w-full top-0 z-50 backdrop-blur-lg">
      <div className="px-5 bg-amber-100 h-18 m-0 w-full">
        <div className="flex flex-1 items-center justify-between gap-1 h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center start-0 gap-1.5 hover:opacity-80 transition-all"
          >
            <div className="flex flex-1 size-12 rounded-xl bg-primary/20 items-center justify-center transition-colors">
              <img src={pen} className="flex-1 size-12" alt="logo" />
            </div>
            <h2 className="text-lg font-bold flex-1">GettyStories</h2>
          </Link>

          {/* Desktop Nav */}
          <div
            className="md:flex hidden overflow-x-auto text-center whitespace-nowrap text-nowrap mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:mask-none px-2">
            <FastNavLinkTag link={"home"} name={"Home"} />
            <FastNavLinkTag link={"stories/top-stories"} name={"Top Stories"} />
            <FastNavLinkTag link={"stories/latest-stories"} name={"Latest Stories"} />
            <FastNavLinkTag link={"topics"} name={"Categories"} />
            <FastNavLinkTag link={"resources"} name={"Resources"} />
            <FastNavLinkTag link={"authors"} name={"Authors"} />
            <FastNavLinkTag link={"settings"} name={"Settings"} />            
          </div>

          <div className="flex right-5 items-center gap-2">
            <Link
              to={"/search"}
              className="btn bg-yellow-200/10 border-none gap-1.5 size-9 p-0 h-9 sm:w-fit sm:px-2 sm:rounded-xl rounded-full transition-colors pt-1"
            >
              <Search className="size-6" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            {authUser ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <div className="size-9 rounded-full bg-amber-400 flex items-center justify-center font-semibold">
                    {authUser?.fullname?.slice(0, 2).toUpperCase() || "PA"}
                  </div>
                  {menuOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] rounded-xl py-3 animate-fadeIn z-50">
                    <p className="px-3 font-semibold capitalize">{authUser.fullname}</p>
                    <p className="px-3 text-sm text-gray-500 mb-2">{authUser?.email}</p>

                    <Link
                      to={`/profile/${authUser?.userSlug}`}
                      className="mx-3 block text-center border rounded-lg py-1.5 mt-2 hover:bg-gray-100 mb-4"
                    >
                      View Profile
                    </Link>

                    <div className="border-t my- w-full border-gray-300"></div>

                    <Link className="px-3 block py-2 hover:bg-gray-50 rounded" to="/create-story">Create Story</Link>

                    <div className="border-t my- w-full border-gray-300"></div>
                    
                    <Link className="px-3 block py-2 hover:bg-gray-50 rounded" to="/dashboard">Stories</Link>
                    <Link className="px-3 block py-2 hover:bg-gray-50 rounded" to="/stats">Stats</Link>
                    <Link className="px-3 block py-2 hover:bg-gray-50 rounded" to="/wallet">Wallet</Link>

                    <div className="border-t border-gray-300"></div>

                    <Link className="block py-2 px-3 hover:bg-gray-50 rounded" to="/settings">Settings</Link>

                    <button
                      className="block w-full text-left py-2 px-3 hover:bg-red-50 text-red-600 rounded mt-"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"/login"}
                className="btn items-center bg-transparent border-none w-fit lg:h-9 px-2 sm:rounded-xl rounded-md transition-colors"
              >
                <span className="text-nowrap">Sign In</span>
              </Link>
            )}

          </div>
        </div>
      </div>

      <div
        className="flex px-3 md:hidden sm:justify-center overflow-x-auto text-center border-t border-base-300 whitespace-nowrap text-nowrap [mask-image:linear-gradient(to_right,transparent,_black_10%,_black_90%,_transparent)]">
        <FastNavLinkTag link={""} name={"Home"} />
        <FastNavLinkTag link={"stories/top-stories"} name={"Top Stories"} />
        <FastNavLinkTag link={"stories/latest-stories"} name={"Latest Stories"} />
        <FastNavLinkTag link={"topics"} name={"Categories"} />
        <FastNavLinkTag link={"resources"} name={"Resources"} />
        <FastNavLinkTag link={"authors"} name={"Authors"} />
        <FastNavLinkTag link={"settings"} name={"Settings"} />
      </div>
    </header>
  );
}

export default Navbar;
