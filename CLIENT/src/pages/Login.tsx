import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useDispatch} from 'react-redux'
import { setuser } from '../redux/userSlice'
function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
})

  const dispatch = useDispatch()

  const handleOnChange = (e:any) =>{
    setUser({ ...user, [e.target.name]: e.target.value })
  }
const handlesubmit = async(e:any)=>{
  e.preventDefault();
  try {

    setLoading(true)
    const res = await axios.post("https://lucid-merch-2yfv.onrender.com/api/v1/users/login", user)
    console.log('data is', res.data.data)
    dispatch(setuser(res.data.data))
    console.log(res.data.data.accesstoken, 'accesstoken')
    Cookies.set("accesstoken", res.data.data.accesstoken,{
      expires: 1,
      path: "/",
      secure: false
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accesstoken}`
    toast.success(res.data.message)
    navigate("/")
    setLoading(false)
}
catch (error: any) {
    setLoading(false)
    toast.error(error.message)
}
}
  
  return (
    <section id="login ">
      <div className=" mx-auto container p-4 ">
        <div className=" text-black bg-white p-8 m-3 w-full max-w-[500px] mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto ">
            <FaUserCircle className="text-6xl" />
          </div>
          <h2 className="text-xl w-96 mx-auto">
            Welcome to lucid merch ! please login
          </h2>
          <form onSubmit={handlesubmit} className="  flex flex-col gap-4 justify-center items-center p-4 rounded">
            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className=" flex flex-col w-full  gap-2">
              <label className="font-bold">Password:</label>
              <div className="flex justify-center items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleOnChange}
                  name="password"
                  value={user.password}
                  placeholder="Enter your password "
                  required
                  className="bg-slate-300 rounded w-full h-10 text-black p-2"
                />
                <div
                  className="cursor-pointer text-xl -ml-8 "
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <p className="block w-fit ml-auto hover:underline hover:text-blue-600 text-blue-600 font-bold">
              forgot password ?
            </p>
           {
            loading?
            <span className="loading loading-spinner loading-lg flex items-center justify-center"></span>:
            <button className="bg-blue-600 hover:bg-blue-500 transition-all h-10 w-full rounded-full font-bold mt-7">
              Login
            </button>
           }

            <p>
              Don't have Account ?{" "}
              <Link
                to={"/signup"}
                className=" hover:underline text-blue-600 font-bold"
              >
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
