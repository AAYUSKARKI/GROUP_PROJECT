import { useState } from "react";
import image1 from "../../../../assests/arch.jpg";
import { FaShippingFast } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

function CardDetailsDisplay() {

    const [count , setCounter] = useState(0);
    const handleCounterDecrease = ()=>{
        if(count > 0)  {
            setCounter(prev =>(prev - 1))
        }
      
    }

    const handleCounterIncrease = ()=>{
        setCounter(prev =>(prev + 1))
    }
  
  return (
    <>
      <div className="text-black ">
        <div className="flex  gap-2 justify-around  items-center w-auto h-[80vh]  px-24 bg-slate-300 ">
          <div className="flex flex-col gap-5  justify-center items-center p-3 w-[40%] h-full   ">
            <div className="   ">
              <img src={image1} alt="" className="h-[350px] mix-blend-multiply" />
            </div>
            <div className="flex gap-2 overflow-scroll scrollbar-hide   border border-gray-600 p-2 ">
                <img src={image1} alt=""  className="h-28"/>
                <img src={image1} alt=""className="h-28" />
                <img src={image1} alt=""className="h-28" />
                <img src={image1} alt=""className="h-28" />
            </div>
          </div>
          <div className= " flex flex-col gap-3 m-3  w-fulll h-full  justify-center p-3 ">
              <h2 className='text-b font-bold md:text-lg text-ellipsis line-clamp-2 text-black'>AMOLED Screen, Stainless Steel</h2>
            <p className='capitalize text-slate-500 text-semibold text-ellipsis line-clamp-4 w'>product Ultima Magnum E400 Luxury Smartwatch with a 1.43” AMOLED Screen, Stainless Steel Frame, Canvas Wrist Strap & Free Leather Strap, Bluetooth Calling, Health Suite, 100+ Sports Modes, IP68 Rated Smart Watch</p>
            <div className='flex flex-col gap-2 m-3'>
            <p className='text-red-600 font-bold text-2xl'>NRS.5000</p>
            <p className='text-slate-500 line-through'>NRS.6000</p>
            </div>

             <div className="flex gap-6 m-5 ">
                <p>Quantity :</p>
                <button className='bg-black text-white w-8 rounded-md' onClick={handleCounterDecrease}>-</button>
                <p>{count}</p>
                <button className='bg-black text-white w-8 rounded-md' onClick={handleCounterIncrease}>+</button>
             </div>

            <div className="flex gap-4 p-12">
                <button className='text-sm bg-orange-600 hover:bg-orange-700 w-full text-white px-3 py-0.5 rounded-full'>Buy Now </button>
                <button className='text-sm bg-orange-600 hover:bg-orange-700 w-full h-12 text-white px-3 py-0.5 rounded-full'>ADD to Cart</button>
            </div>


            <div className="flex flex-col gap-5   w-full   p-3 m-5 ">
            <h2>Delivery & service </h2>
            <div>
                <div className="flex gap-2">
                     <FaShippingFast className="text-3xl"/>
                <p className="font-bold  "> Fastest Delivery   </p>
               
                </div>
                 <p className="text-slate-500 ml-8">All over Nepal </p>

               <div  className="flex gap-2">
                <BsCashCoin className="text-3xl"/>
               <p className="font-bold">Cash On Delivery Available</p>
               
               </div>
                <p className="text-slate-500 ml-8">For near Area</p>
            </div>
          </div>
          </div>

         
        </div>
      </div>
    </>
  );
}

export default CardDetailsDisplay;
