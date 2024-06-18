import {useEffect,useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

const useGetcarts = () => {

  const { user } = useSelector((state: any) => state.user)

    const [carts, setCarts] = useState<Cart[]>([]);

    const getCarts = async () => {
      if(user?.user){
        axios.defaults.withCredentials = true
        const response = await axios.post("https://lucid-merch-2yfv.onrender.com/api/v1/carts/getcart",{user:user.user._id})
        console.log('response from products',response.data.data)
        setCarts(response.data.data)
      }
    }

    useEffect(() => {
        getCarts()
    }, [])
  
    return {carts}
}

export default useGetcarts