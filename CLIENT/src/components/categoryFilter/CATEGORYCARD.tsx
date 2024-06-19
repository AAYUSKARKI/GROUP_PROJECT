
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
function Categorycard({product} : any) {

  const { user } = useSelector((state: any) => state.user)
  const navigate = useNavigate();

  const handleAddToCart = async() => {
    axios.defaults.withCredentials = true
    const response = await axios.post('https://lucid-merch-2yfv.onrender.com/api/v1/carts/createcart', {
      product: product._id,
      userid:user.user._id
    })
    console.log(response.data)
    toast.success(response.data.message)
  }

  const {theme} = useSelector((state : any) => state.theme);
  return (
    <div className={`cursor-pointer w-full min-w-[290px] md:min-w-[320px] max-w-[290px] md:max-w-[400px] h-56 ${theme === 'light' ? 'bg-white shadow-2xl' : 'bg-slate-800 shadow-lg'} rounded-md flex  m-7`}>
    <div className={`${theme === 'light' ? 'bg-slate-200' : 'bg-slate-50'} shadow-2xl h-full p-4 min-w-[120px] md:min-w-[145px] mx-1 relative`}>
        <img src={product.image} onClick={() => navigate(`/product/${product._id}`)} className='object-cover w-full h-full hover:scale-110 transition-all mix-blend-multiply  '/>
    </div>
    <div className='p-4 grid  gap-2'>
        <h2 className={` font-bold md:text-lg text-ellipsis line-clamp-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{product.name}</h2>
        {/* <div className='capitalize text-slate-500'>{parse(product.description)}</div> */}
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