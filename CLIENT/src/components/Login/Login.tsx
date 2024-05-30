import React from "react";
import { FaUserCircle } from "react-icons/fa";
function Login() {
  return (
    <section id="login " >
      <div className=" mx-auto container  ">
        <div className=" text-black bg-white p-5 w-full max-w-[500px] mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto ">
            <FaUserCircle className="text-6xl" />
          </div>
           <h2 className="text-xl w-96 mx-auto">Welcome to lucid merch ! please login</h2>
          <form className="  flex flex-col gap-4 justify-center items-center p-4 rounded">
           
            <div className=" flex flex-col w-full ">
              <label className="font-bold">Email:</label>
              <input
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your email"
              />
            </div>
            <div className=" flex flex-col w-full ">
              <label className="font-bold">Password:</label>
              <input
                type="password"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your password "
              />
            </div>

            <button className="bg-blue-400 h-10 w-24 rounded-full">Login </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
