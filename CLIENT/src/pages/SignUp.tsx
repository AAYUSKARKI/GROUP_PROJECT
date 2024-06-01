import imageTobase64 from "@/helpers/imageTobase";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);

  const [data, setData] = useState({
    name:"", 
    email: "",
    password:"",
    confirmPassword: "",
    avatar: ""
  })

  const handleOnChange = (e)=>{
    const {name, value} = e.target
    setData((prev)=>{
     return{
      ...prev,
      [name] : value
     }
    })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
  
    
    const imagePic = await imageTobase64(file)
    
    setData((prev)=>{
      return{
        ...prev,
        avatar : imagePic
      }
    })

  }
  return (
    <section id="sign-up">
      <div className="container  mx-auto  p-7">
        <div className="text-black bg-white p-8 m-3 w-full max-w-[500px] mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src ={data.avatar } alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className=" flex flex-col gap-4">
            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">FULL NAME:</label>
              <input
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter full name"
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">EMAIL:</label>
              <input
                type="email"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your email"
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">PASSWORD:</label>
              <div className="flex justify-center items-center">
                <input
                  type={showPassword ? "text" : "password"}
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
                  type={confirmedPassword ? "text" : "password"}
                  className="bg-slate-300 rounded w-full h-10 text-black p-2"
                  placeholder="Conform password"
                  required
                />
                <div
                  className="cursor-pointer text-xl -ml-8 "
                  onClick={() => setConfirmedPassword((preve) => !preve)}
                >
                  <span>{confirmedPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <Link
              to={"/Login"}
              className="bg-blue-600 text-center py-2 hover:bg-blue-500 transition-all h-10 w-full rounded-full font-bold mt-7"
            >
              sign up
            </Link>
          </form>

          {/* -------google sign up ------*/}

          <div className="relative flex items-center justify-center w-full mt-4 border-t">
            <span className="absolute px-2 bg-white text-gray-600">or</span>
          </div>
          <button className="flex items-center justify-center bg-orange-400 w-full px-4 py-4 mt-4  font-semibold text-gray-700 border rounded-md ">
            <FaGoogle className="text-red-700 text-2xl mx-2" />
            <span>Sign Up with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
