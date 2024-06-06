import { useState,useRef,useEffect } from "react";
import { Link } from "react-router-dom"
import { RiShoppingCart2Line, RiHeartLine } from 'react-icons/ri';
import { FaSearch, FaUser } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetcarts from "@/hooks/useGetcarts";
// import useGetgoogleloginuser from "@/hooks/useGetgoogleloginuser";
function Navbar() {

  // useGetgoogleloginuser()

  const { carts } = useGetcarts()

  const [open, setOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<number | undefined>(undefined);
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const { user } = useSelector((state: any) => state.user)

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
 

  //http://localhost:7000/api/v1/products/autocompletesearch?key=a

  const fetchSuggestions = async () => {
    const response = await axios.get(`http://localhost:7000/api/v1/products/autocompletesearch?key=${search}`)
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
    alert(`searching for ${search}`)
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


  return (
  <>
  <div className="bg-white border-b-2 border-slate-200 p-2 flex justify-between">
    <div className="flex flex-col py-2 px-2 ml-8 ">
        <p className="text-2xl text-black font-bold "><Link to={"/"}>Lucid Merch</Link></p>
        <p className="text-xs text-black font-bold">" Merch for Nerds "</p>
    </div>
    <div className="flex items-center gap-10 ">
        <ul className="flex gap-[2.5rem] mr-[52px]">
            {links.map((link) => (
                <li key={link.name} className="cursor-pointer text-2xl text-black hover:text-slate-500 ">
                    <Link to={link.link}>{link.name}</Link>
                </li>
            ))}
            {
              user ? user.user.role === "admin" && (
                <li className="cursor-pointer text-2xl text-black hover:text-slate-500 ">
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
              className="w-[300px] p-1 rounded-md text-black appearance-none bg-slate-100 border-black focus:outline-none focus:shadow-outline" 
              onChange={handleSearch}
              />
              <ul className="absolute bg-white p-2 w-[300px] rounded-md text-black border-black flex flex-col gap-1 mt-1">
                { suggestions && suggestions.map((suggestion: any) => (
                <li key={suggestion._id} className="hover:bg-slate-200">
                    <Link to={`/product/${suggestion.id}`}>{suggestion.name}</Link>
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
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">1</span>
            </div>
            <div className="relative">
              <Link to={"/carts"}><RiShoppingCart2Line  className=" cursor-pointer w-8 h-8"/></Link>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">{carts.length}</span>
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
                  <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
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
  </div>
  </>
  )
}

export default Navbar