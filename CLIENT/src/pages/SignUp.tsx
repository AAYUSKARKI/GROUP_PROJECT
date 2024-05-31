import React from 'react'

function SignUp() {
  return (
    <section id='sign-up'>
      <div className='container  mx-auto  p-7'>
        <div className='text-black bg-white p-8 m-3 w-full max-w-[500px] mx-auto rounded-xl'>
            <h1>sign up </h1>
            <form>
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
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter your email"
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">PASSWORD:</label>
              <input
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Enter password "
                required
              />
            </div>

            <div className=" flex flex-col w-full gap-2 ">
              <label className="font-bold">CONFIRM PASSWORD</label>
              <input
                type="text"
                className="bg-slate-300 rounded w-full h-10 text-black p-2"
                placeholder="Conform password"
                required
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 transition-all h-10 w-full rounded-full font-bold mt-7">sign up </button>
           
            </form>
            <div className='w-ful h-4 p-5'>
               <button>google Account</button>
            </div>
        </div>
      </div>

    </section>
  )
}

export default SignUp