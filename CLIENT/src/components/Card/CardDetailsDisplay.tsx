import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import Homecards from "../Cards/Homecards";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useGetproduct from "@/hooks/useGetprouct";
import { useParams } from "react-router-dom";

function CardDetailsDisplay() {

  let response:any;
    const [count , setCounter] = useState(1);

    const navigate = useNavigate();

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

    const { user } = useSelector((state: any) => state.user)

    const handleAddToCart = async() => {
      if(user?.user ) {
        console.log('user', user?.user)
        axios.defaults.withCredentials = true
       response = await axios.post('http://localhost:7000/api/v1/carts/createcart', {
        product: Singleproduct._id,
        quantity: count,
        userid: user?.user._id
      })
      console.log(response.data)
      toast.success(response.data.message)
      }
      else {
        toast.error('Please Login First')
        navigate('/login')
      }
      
    }

    const handleBuyNow = ()=>{
        handleAddToCart();
        navigate(`/order/${response.data.data._id}`)
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
                <button className='text-sm bg-orange-600 hover:bg-orange-700 w-full text-white px-3 py-0.5 rounded-full' onClick={handleBuyNow}>Buy Now </button>
                <button className='text-sm bg-orange-600 hover:bg-orange-700 w-full h-12 text-white px-3 py-0.5 rounded-full' onClick={handleAddToCart}>ADD to Cart</button>
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
