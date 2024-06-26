import { useState,useRef,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { RiShoppingCart2Line, RiHeartLine } from 'react-icons/ri';
import { FaBars, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import axios from "axios";
import LoginPopup from "@/popup/LOGIN_NOW";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import useGetcarts from "@/hooks/useGetcarts";
import { setuser } from "@/redux/userSlice";
import Theme from "../Theme/Theme";
// import useGetgoogleloginuser from "@/hooks/useGetgoogleloginuser";
function Navbar() {
  const {theme} = useSelector((state : any) => state.theme);
  const dispatch = useDispatch()

  // const googleloginuser = useGetgoogleloginuser()
  const navigate = useNavigate()
  // useGetgoogleloginuser()

  const { carts = [] } = useGetcarts()
  const [cartLength, setCartLength] = useState(carts ? carts.length : 0)
  const [popup, setPopup] = useState(false)
  const [open, setOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<number | undefined>(undefined);
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector((state: any) => state.user)
  console.log(user)

  useEffect(() => {
    if (carts) {
      setCartLength(carts.length);
    }
  }, [carts]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('inside timeout')
      if (!user) {
        setPopup(true);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timeout);
  }, [user]);

    const handleMouseEnter = () => {
        clearTimeout(dropdownRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownRef.current = window.setTimeout(() => {
            setIsDropdownOpen(false);
        }, 500);
    };
  const handleClick = () => {
    setOpen(!open)
  }
 
  const handleuserIcon = ()=>{
    setIsDropdownOpen(prevState => !prevState)
  }
 

  //https://lucid-merch-2yfv.onrender.com/api/v1/products/autocompletesearch?key=a

  const fetchSuggestions = async () => {
    const response = await axios.get(`https://lucid-merch-2yfv.onrender.com/api/v1/products/autocompletesearch?key=${search}`)
    console.log(response.data.data)
    setSuggestions(response.data.data)
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleInputBlur = () => {
    setSuggestions([])
  }

  useEffect(() => {
    if (search) {
      fetchSuggestions()
    }
  }, [search])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/products/search/?query=${search}`)
    setSuggestions([])
  }

  const links = [
    {
       name: "Home", link: "/" 
    },
    {
       name: "Checkout", link: "/checkout" 
    },
    {
       name: "Shop", link: "/shop" 
    },
  ]

  const cookie =Cookies.get('accesstoken')
  console.log('cookie',cookie)

  // useEffect(() => {
  //   // If cookie is not present, set user to null
  //   if (!cookie) {
  //     dispatch(setuser(null));
  //   }
  // }, [cookie, dispatch]);

  const handleLogout = async() => {
    axios.defaults.withCredentials = true
    const res= await axios.post('https://lucid-merch-2yfv.onrender.com/api/v1/users/logout')
    console.log(res.data.message)
    toast.success(res.data.message)
    dispatch(setuser(null))
    Cookies.remove('accesstoken')
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  console.log('cart length is',cartLength)

  return (
  <>
  <div className={`${theme === 'light' ? 'bg-white border-b-2 border-slate-200':'bg-slate-950 text-white border-slate-900'}sticky top-0 z-50  p-2 flex justify-between`}>
    <div className="flex flex-col py-2 px-2 ml-8 ">
        <p className={` ${theme === 'light' ? 'text-black':'text-white'} text-2xl font-bold `}><Link to={"/"}>Lucid Merch</Link></p>
        <p className={`text-xs ${theme === 'light' ? 'text-black':'text-white'} font-bold`}>" Merch for Nerds "</p>
    </div>
    <div className="hidden md:flex items-center gap-10 ">
        <ul className="flex gap-[2.5rem] mr-[52px]">
            {links.map((link) => (
                <li key={link.name} className={`${theme === 'light' ? 'text-black':'text-white'}cursor-pointer text-2xl hover:text-slate-500 `}>
                    <Link to={link.link}>{link.name}</Link>
                </li>
            ))}
            {
              user ? user?.user?.role === "admin" && (
                <li className={`${theme === 'light' ? 'text-black':'text-white'}cursor-pointer text-2xl  hover:text-slate-500`}>
                  <Link to={'/admin'}>Admin</Link>
                </li>
              ): null
            }
        </ul>
        <div className="flex gap-[1.2rem]">
          {
            open
              ? 
              <>
              <form onSubmit={handleSubmit}>
              <input
              type="search"
              name="search"
              id="search"
              value={search}
              onBlur={handleInputBlur} 
              className="w-[300px] p-1 rounded-md border text-black appearance-none border-black focus:outline-none focus:shadow-outline" 
              onChange={handleSearch}
              />
              <ul className="absolute bg-white p-2 w-[300px] rounded-md text-black border-black flex flex-col gap-1 mt-1">
                { suggestions && suggestions.map((suggestion: any) => (
                <li key={suggestion._id} className="hover:bg-slate-200">
                    <Link to={`/products/search/?query=${suggestion.name}`}>{suggestion.name}</Link>
                </li>
                ))}
              </ul>
               </form>
              <FaSearch className="cursor-pointer w-8 h-8" onClick={handleClick}/>
              </>
              : <FaSearch className="cursor-pointer w-8 h-8" onClick={handleClick}/>
          }
          <div className="relative">
              <RiHeartLine  className=" cursor-pointer w-8 h-8"/>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
            </div>
            <div className="relative">
              <Link to={"/carts"}><RiShoppingCart2Line  className=" cursor-pointer w-8 h-8"/></Link>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"> {cartLength}</span>
            </div>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {
              user?.user?.avatar ? 
              <img 
               src={user.user.avatar} 
               className="w-10 h-10 rounded-full cursor-pointer" 
               onClick={handleuserIcon} />
              :
              <FaUser className=" cursor-pointer w-8 h-8" onClick={handleuserIcon} />}
            {isDropdownOpen && (
              user?.user ? (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link to={`/profile/${user.user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center">Logout</button>
                </div>
              ) : (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <Link to={"/login"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                    <Link to={"/register"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
                </div>
              )
            )}
        </div>
        </div>
    </div>
    <div className="flex md:hidden">
    <div className="flex gap-4 mt-4 ml-6">
            <div className="relative">
              <RiHeartLine className="cursor-pointer w-8 h-8" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
            </div>
            <div className="relative">
              <Link to={"/carts"}><RiShoppingCart2Line className="cursor-pointer w-8 h-8" /></Link>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"> {cartLength}</span>
            </div>
            </div>
          <button className="p-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes className="w-8 h-8" /> : <FaBars className="w-8 h-8" />}
          </button>
        </div>
    </div>
        {isMobileMenuOpen && (
          <>
        <div className="fixed inset-0 z-50 md:hidden justify-center gap-[100px] flex flex-col items-center bg-white border-t-2 border-slate-200 py-2">
          <button className="absolute top-4 right-4" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes className="w-8 h-8" />
          </button>
          <ul className="flex flex-col justify-center items-center gap-10">
            {links.map((link) => (
              <li key={link.name} className="cursor-pointer text-xl text-black hover:text-slate-500">
                <Link to={link.link} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
              </li>
            ))}
            {user && user.user?.role === "admin" && (
              <li className={`${theme === 'light' ? 'text-black':'text-white'}cursor-pointer text-2xl hover:text-slate-500 `}>
                <Link className={`${theme === 'light' ? 'text-black':'text-white'}cursor-pointer text-2xl hover:text-slate-500 `} to={'/admin'} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
              </li>
            )}
          </ul>
          <div className="flex gap-4 mt-4">
            <div className="relative">
              <RiHeartLine className="cursor-pointer w-8 h-8" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">1</span>
            </div>
            <div className="relative">
              <Link to={"/carts"}><RiShoppingCart2Line className="cursor-pointer w-8 h-8" /></Link>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"> {cartLength}</span>
            </div>
            <div className="relative" onClick={handleuserIcon}>
              {user?.user?.avatar ? (
                <img
                  src={user.user.avatar}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <FaUser className="cursor-pointer w-8 h-8" />
              )}
              {isDropdownOpen && (
                user?.user ? (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <Link to={`/profile/${user.user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center">Logout</button>
                  </div>
                ) : (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <li className={`cursor-pointer text-xl ${theme === 'light' ? 'text-black':'text-white'} hover:text-slate-500`}>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className={` cursor-pointer text-xl ${theme === 'light' ? 'text-black':'text-white'} hover:text-slate-500`}>
                  <Link to={"/register"}>Register</Link>
                </li>
                  </div>
                )
              )}
            </div>
          </div>
  </div>
  </>)}
  <LoginPopup isOpen={popup && !user} onClose={() => setPopup(false)} /> 
    <Theme />
  </>
  )
}

export default Navbar