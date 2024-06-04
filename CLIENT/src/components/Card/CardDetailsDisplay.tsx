import { useState } from "react";
import image1 from "../../../../assests/arch.jpg";
import { FaShippingFast } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import Homecards from "../Cards/Homecards";
import useGetproduct from "@/hooks/useGetprouct";
import { useParams } from "react-router-dom";

function CardDetailsDisplay() {

    const [count , setCounter] = useState(0);


    const {id} = useParams();
    const {Singleproduct} = useGetproduct(id as string);

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
              <img src={Singleproduct?.image} alt="" className="h-[350px] mix-blend-multiply" />
            </div>
            <div className="flex gap-2 overflow-scroll scrollbar-hide   border border-gray-600 p-2 ">
                <img src={Singleproduct.image} alt=""  className="h-28"/>
                <img src={Singleproduct.image} alt=""className="h-28" />
                <img src={Singleproduct.image} alt=""className="h-28" />
                <img src={Singleproduct.image} alt=""className="h-28" />
            </div>
          </div>
          <div className= " flex flex-col gap-3 m-3  w-fulll h-full  justify-center p-3 ">
              <h2 className='text-b font-bold md:text-lg text-ellipsis line-clamp-2 text-black'>{Singleproduct.name}</h2>
            <p className='capitalize text-slate-500 text-semibold text-ellipsis line-clamp-4 w'>{Singleproduct.description}</p>
            <div className='flex flex-col gap-2 m-3'>
            <p className='text-red-600 font-bold text-2xl'>NPR{Singleproduct.price - Singleproduct.discount}</p>
            <p className='text-slate-500 line-through'>NPR{Singleproduct.price}</p>
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
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3">
      <Homecards/>
      </div>
     
    </>
  );
}

export default CardDetailsDisplay;
