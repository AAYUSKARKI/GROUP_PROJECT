import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) =>{
    const {name, value} = e.target
       setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }
const handlesubmit = (e)=>{
  e.preventDefault()
}
  

  console.log("user data", data)
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
                value={data.email}
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
                  value={data.password}
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

            <button className="bg-blue-600 hover:bg-blue-500 transition-all h-10 w-full rounded-full font-bold mt-7">
              Login
            </button>

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
