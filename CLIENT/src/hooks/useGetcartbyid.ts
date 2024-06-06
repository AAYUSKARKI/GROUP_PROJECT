import {useEffect,useState} from "react";
import axios from "axios";

// Define the interface for Product within Cart
interface Product {
    category: string;
    color: string;
    createdAt: string;
    description: string;
    discount: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    rating: number;
    size: string[];
    updatedAt: string;
    __v: number;
    _id: string;
  }
  
  // Define the interface for User within Cart
  interface User {
    avatar: string;
    createdAt: string;
    email: string;
    isVerified: boolean;
    password: string;
    refreshtoken: string;
    role: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
  }
  
  // Define the interface for Cart
  interface Cart {
    _id: string;
    createdAt: string;
    product: Product;
    quantity: number;
    updatedAt: string;
    user: User;
    __v: number;
  }

const useGetcartbyid = (id : string) => {

    const [cart, setCart] = useState([] as Cart[])

    const getCart = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.get(`http://localhost:7000/api/v1/carts/getsinglecart/${id}`)
        console.log('response from products',response.data.data)
        setCart(response.data.data)
    }

    useEffect(() => {
        getCart()
    }, [])
  
    return {cart}
}

export default useGetcartbyid