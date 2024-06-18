
// import arch from '../../../../assests/arch.jpg'
// import { ImCross } from "react-icons/im";
import { FaMinus, FaPlus } from 'react-icons/fa';
import useGetcarts from '@/hooks/useGetcarts';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
function Cartsdetail() {


    const {carts} = useGetcarts();
    console.log('your carts',carts)

    const initializeQuantities = carts.map((cart: any) => [cart._id, cart.quantity]);

    const initialQuantities = Object.fromEntries(initializeQuantities);

    const [quantities, setQuantities] = useState<{ [key: string]: number }>(initialQuantities);

    useEffect(() => {
        // Update the quantities state whenever the carts data changes
        setQuantities(Object.fromEntries(carts.map(cart => [cart._id, cart.quantity])));
    }, [carts]);

    // Function to handle incrementing quantity
    const incrementQuantity = (id: string) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1,
        }));
    };

    // Function to handle decrementing quantity
    const decrementQuantity = (id: string) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max(prevQuantities[id] - 1, 1), // Ensure quantity does not go below 1
        }));
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this item?");
        if (confirm) {
            try {
                const response = await axios.post(`http://localhost:7000/api/v1/carts/deletecart/${id}`);
                toast.success(response.data.message);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <h1 className='text-lg text-center font-bold text-slate-900'>Your Cart</h1>
        <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
        <table className="w-full text-sm text-slate-500 dark:text-slate-400 border-b-[8px] border-red-500 dark:border-slate-700 dark:bg-slate-900">
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
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th> 
                </tr>
            </thead>
            <tbody>
                {
                    carts.length > 0 ? carts.map((cart) => (
                    <tr key={cart._id} className="bg-white border-b-[8px] border-slate-300 dark:bg-slate-900">
                        <td className="px-6 py-4 h-[100px] w-[200px]">
                        <img src={cart?.product?.image} alt="image" />
                        </td>
                        <td className="px-6 py-4 ">
                          <div className='flex items-center justify-center'><p className='antialiased text-black '>{cart.product?.price-cart.product?.discount}</p></div>
                        </td>
                        <td className="px-6 py-4 ">
                         <div className='flex items-center justify-center gap-3'>
                            <FaMinus onClick={() => decrementQuantity(cart._id)} />
                            <p className='text-center'>{quantities[cart._id]}</p>
                            <FaPlus onClick={() => incrementQuantity(cart._id)} />
                         </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className='flex items-center justify-center'><p className='antialiased text-black '>{(cart.product?.price-cart.product?.discount)*quantities[cart._id]}</p></div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className='flex items-center justify-center gap-3'>
                        <Link to={`/order/${cart._id}`}>
                        <button className='text-center text-green-600 text-xl'>Order Now</button>
                        </Link>
                            <button onClick={() => handleDelete(cart._id)} className='text-center text-red-600 text-xl '>Remove</button>
                         </div>
                        </td>
                    </tr>
                    ))
                    :
                    (
                        <tr>
                        <td colSpan={5}>
                            <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
                                <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
                                <p className="text-lg text-slate-700">Add items to it now</p>
                            </div>
                        </td>
                    </tr>
                    )}
            </tbody>
        </table>
    </div>
        </>
    )
}

export default Cartsdetail