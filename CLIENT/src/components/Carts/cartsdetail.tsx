import React from 'react'
import arch from '../../../../assests/arch.jpg'
import { ImCross } from "react-icons/im";
function Cartsdetail() {
    return (
        <>
            <h1 className='text-lg text-center  '>Your Cart</h1>
            {/* <div className="main-div flex justify-between h-[300px] w-[500px]">
                <div className="image h-[100px] w-[200px] "><img src={arch} alt="image"/></div>
                <div className="cart-price">
                    <p className='mr-4'>$40</p>
                </div>
                <div className="quantity">Quantity</div>
                <div className="total">total</div>
            </div> */}
        <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
        <table className="w-full text-sm text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 dark:bg-slate-900">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                            Item
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        total
                    </th>
                  
                </tr>
            </thead>
            <tbody>
                
                    <tr  className="bg-white border-b dark:bg-slate-900">
                        <td className="px-6 py-4 ">
                        <img src={arch} alt="image" height={"100px"} width={'200px'} />
                        </td>
                        <td className="px-6 py-4 ">
                          <p className='antialiased text-black '>$40</p>
                        </td>
                        <td className="px-6 py-4 ">
                         <div className='  w-18  '><button className=' bg-red-500 border rounded-md px-5 py-1 text-black'>+</button><span>1</span> <button className=' bg-blue-500 border rounded-md px-5 py-1 text-black'>-</button></div>
                        </td>
                        <td className="px-6 py-4 ">
                            40$
                          <button><ImCross/></button>
                        </td>
                      
                    </tr>
                
            </tbody>
        </table>
    </div>


        </>
    )
}

export default Cartsdetail