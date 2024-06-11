import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { IoCloudUploadOutline, IoPersonOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {

      const [showPassword, setShowPassword] = useState(false);
      const [showconfirmPassword, setShowConfirmPassword] = useState(false);
      const [loading, setLoading] = useState(false);


      const [user,setUser] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : ""
      })

      const [avatar,setAvatar] = useState("")
      const [avatarPreview,setAvatarPreview] = useState("")

      const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };

      const handleUploadPic = async (e : any) => {
        const file = e.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setAvatarPreview(reader.result as string);
        };
      };

      const handleSubmit = async (e : any) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        if(!avatar){
          toast.error('Avatar is Required')
        }

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("password", user.password);

        try {
          setLoading(true);
          const response = await axios.post("https://lucidmerch.onrender.com/api/v1/users/register", formData)

          if (response.data.success) {
            toast.success(response.data.message);
            setLoading(false);
          } 
          else {
            setLoading(false);
            toast.error(response.data.message);
          }

        } catch (error: any)
         {
          setLoading(false);
          console.log(error);
          toast.error(error.message);
        }
        finally {
          setLoading(false);
        }
      };

      const handleGoogleLogin = () => {
        window.open("https://lucidmerch.onrender.com/auth/google/login", "_self");
      };


  return (
    <section id="sign-up">
      <div className="container  mx-auto  p-7 ">
        <div className="text-black bg-white p-8 m-3 w-full max-w-[500px] mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto overflow-hidden  rounded-full border-green-700 border-[1px]">
            <div>
              {
              avatarPreview ? <img 
                 className="w-full h-full object-cover"
                 src ={avatarPreview} 
                 alt="login icons" />:
                 <div className="flex items-center justify-center">
                  <IoPersonOutline className="text-4xl"/>
                 </div>
              }
            </div>
            <form>
              <label>
                <div className="text-xl flex justify-center items-center pb-4 pt-2 cursor-pointer w-full">
                  <IoCloudUploadOutline/>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  required
                />
              </label>
            </form>
          </div>

          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">FULL NAME:</label>
              <input
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                name="username"
                onChange={handleChange}
                value={user.username}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">EMAIL:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">PASSWORD:</label>
              <div className="flex justify-center items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  className="bg-slate-300 rounded w-full h-10 text-black p-2"
                  placeholder="Enter password "
                  required
                />
                <div
                  className="cursor-pointer text-xl -ml-8 "
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">CONFIRM PASSWORD</label>
              <div className="flex justify-center items-center">
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  className="bg-slate-300 rounded w-full h-10 text-black p-2"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={user.confirmPassword}
                  placeholder="Conform password"
                  required
                />
                <div
                  className="cursor-pointer text-xl -ml-8 "
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>{showconfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            {<button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-center py-2 hover:bg-blue-500 transition-all h-10 w-full rounded-full font-bold mt-7"
            >
              Sign Up
            </button>}
          </form>

          {/* -------google sign up ------*/}

          <div className="relative flex items-center justify-center w-full mt-4 border-t">
            <span className="absolute px-2 bg-white text-gray-600">or</span>
          </div>
          <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-orange-400 w-full px-4 py-4 mt-4  font-semibold text-gray-700 border rounded-md ">
            <FaGoogle className="text-red-700 text-2xl mx-2" />
            <span>Sign Up with Google</span>
          </button>
        </div>
        <div className="flex items-center justify-center w-full mt-4"> 
           <span>Already have an account?</span> <Link
            to="/login"
            className="text-xl text-center text-blue-600 hover:text-blue-700"
          >Login
          </Link>
      </div>
      </div>
    </section>
  )
}

export default SignUp;
