import parse from 'html-react-parser';
import axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Categorycard({product} : any) {
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  if(qty < 1) {
    setQty(1)
  }

  const handleAddToCart = async() => {
    axios.defaults.withCredentials = true
    const response = await axios.post('http://localhost:7000/api/v1/carts/createcart', {
      product: product._id,
      quantity: qty
    })
    console.log(response.data)
    toast.success(response.data.message)
  }


  return (
    <div className='cursor-pointer w-full min-w-[290px] md:min-w-[320px] max-w-[290px] md:max-w-[320px] h-56 bg-white rounded-md shadow flex  m-7'>
        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] mx-1 relative'>
            <img src={product.image} onClick={() => navigate(`/product/${product._id}`)} className='object-scale-down w-full h-full hover:scale-110 transition-all mix-blend-multiply  '/>
            <div className='absolute bottom-0  p-1 flex gap-3 items-center justify-center '>
            <FaMinus size={20} onClick={() => setQty(prev => prev - 1)}/>
            {qty}
             <FaPlus size={20} onClick={() => setQty(prev => prev + 1)}/>
            </div>
        </div>
        <div className='p-4 grid  gap-2'>
            <h2 className='text-b font-bold md:text-lg text-ellipsis line-clamp-2 text-black'>{product.name}</h2>
            <div className='capitalize text-slate-500'>{parse(product.description)}</div>
            <div className='flex gap-3'>
            <p className='text-red-600 font-medium'>NRS.{product.price - product.discount}</p>
            <p className='text-slate-500 line-through'>NRS.{product.price}</p>
            </div>
            <div className='flex gap-5'>
            {product?.size[0]?.split(',').map((size: string, index: number) => (
            <button key={index} className='bg-black text-white w-8 rounded-md'>
            {size.trim()}
            </button>
  ))}
         </div>
   <button 
   onClick={handleAddToCart}
   className='text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
             </div>
     </div>
  )
}

export default Categorycard