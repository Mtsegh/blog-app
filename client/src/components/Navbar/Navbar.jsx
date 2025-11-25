import { useState } from "react";
import { Link } from "react-router-dom";
import pen from "../../assets/pen.svg";
import { LogIn, Settings, ChevronDown, ChevronUp, Search } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  function FastNavLinkTag({ link, name }) {
    return (
      <Link
        to={`/${link}`}
        className="[font-size:1em] text-gray-700 hover:text-gray-950 my-2 mx-1 px-2 justify-center"
      >
        {name}
      </Link>
    );
  }

  return (
    <header className="relative border-b border-base-300 w-full top-0 z-50 backdrop-blur-lg">
      <div className="px-5 bg-amber-300 h-18 m-0">
        <div className="flex items-center justify-between gap-1 h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center start-0 gap-1.5 hover:opacity-80 transition-all"
          >
            <div className="flex flex-1 size-12 rounded-xl bg-primary/20 items-center justify-center transition-colors">
              <img src={pen} className="flex-1 size-12" alt="logo" />
            </div>
            <h2 className="text-lg font-medium flex-1">GettyStories</h2>
          </Link>

          {/* Desktop Nav */}
          <div
            className="md:flex hidden overflow-x-auto text-center whitespace-nowrap text-nowrap [mask-image:linear-gradient(to_right,transparent,_black_10%,_black_90%,_transparent)] px-2">
            <FastNavLinkTag name={"Home"} />
            <FastNavLinkTag name={"Top Stories"} />
            <FastNavLinkTag name={"Latest Stories"} />
            <FastNavLinkTag name={"Categories"} />
            <FastNavLinkTag name={"Resources"} />
            <FastNavLinkTag name={"Authors"} />
            
          </div>

          <div className="flex right-5 items-center gap-2">
            <Link
              to={"/search"}
              className="btn gap-1.5 size-9 p-0 lg:h-9 sm:w-fit sm:px-2 sm:rounded-xl btn-small rounded-full transition-colors"
            >
              <Search className="size-6" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            {/* <Link
              to={"/settings"}
              className="btn gap-2 size-9 p-0 lg:h-9 lg:w-fit lg:px-2 lg:rounded-md btn-small rounded-full transition-colors"
            >
              <Settings className="size-5" />
              <span className="hidden lg:inline">Settings</span>
            </Link> */}
            {authUser ? (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 size-8.5 rounded-full">
                  <span className="inline">CK</span>
                </Link>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <ChevronUp className="size-6" /> : <ChevronDown className="size-6" />}
                </button>
              </>
            ) : (
              // <Link to={"/login"} className="btn btn-sm gap-2">
              //   <LogIn className="size-5" />
              //   <span className="hidden sm:inline">Login</span>
              // </Link>
              <div className="flex gap-4"><Link>Join</Link>
              <Link>Sign In</Link></div>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex px-3 md:hidden sm:justify-center overflow-x-auto text-center border-t border-base-300 whitespace-nowrap text-nowrap [mask-image:linear-gradient(to_right,transparent,_black_10%,_black_90%,_transparent)]">
        <FastNavLinkTag link="" name={"Home"} />
        <FastNavLinkTag link="" name={"Top Stories"} />
        <FastNavLinkTag link="" name={"Latest Stories"} />
        <FastNavLinkTag link="" name={"Categories"} />
        <FastNavLinkTag link="" name={"Resources"} />
        <FastNavLinkTag link="" name={"Authors"} />
        <FastNavLinkTag link="/settings" name={"Settings"} />
      </div>
    </header>
  );
}

export default Navbar;
