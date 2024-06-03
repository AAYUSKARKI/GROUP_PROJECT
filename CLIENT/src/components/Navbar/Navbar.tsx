import { useState,useRef } from "react";
import { Link } from "react-router-dom"
import { RiShoppingCart2Line, RiHeartLine } from 'react-icons/ri';
import { FaSearch, FaUser } from "react-icons/fa";
function Navbar() {

  const [open, setOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<number | undefined>(undefined);

    const handleMouseEnter = () => {
        clearTimeout(dropdownRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownRef.current = window.setTimeout(() => {
            setIsDropdownOpen(false);
        }, 5000);
    };
  const handleClick = () => {
    setOpen(!open)
  }
 
  const handleuserIcon = ()=>{
    setIsDropdownOpen(prevState => !prevState)
  }
  const [search, setSearch] = useState('')


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }


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
    <div className="flex items-center gap-10">
        <ul className="flex gap-[2.5rem]">
            {links.map((link) => (
                <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                </li>
            ))}
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
              className="w-[200px] p-1 rounded-md text-black appearance-none bg-white border-black focus:outline-none focus:shadow-outline" 
              onChange={handleSearch}
              />
               </form>
              <FaSearch onClick={handleClick}/>
              </>
              : <FaSearch onClick={handleClick}/>
          }
          <div className="relative">
              <RiHeartLine />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">1</span>
            </div>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaUser className=" cursor-pointer" onClick={handleuserIcon} />
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <Link to={"/login"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                    <Link to={"/register"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
                </div>
            )}
        </div>
        <div className="relative">
              <RiShoppingCart2Line />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">1</span>
            </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default Navbar