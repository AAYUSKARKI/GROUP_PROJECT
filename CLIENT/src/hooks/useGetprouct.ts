import {useEffect,useState} from "react";
import axios from "axios";

const useGetproduct = (id: string) => {

    interface Product {
        _id: string
        name: string
        description: string
        category: string
        price: number
        discount: number
        quantity: number
        color: string
        image: string
        size: string[]
    }

    const [Singleproduct, setProduct] = useState({} as Product)

    const getproductbyid = async () => {
        const response = await axios.get(`https://lucidmerch.onrender.com/api/v1/products/getproductbyid/${id}`)
        console.log('response from product',response.data.data)
        setProduct(response.data.data)
    }

    useEffect(() => {
        getproductbyid()
    }, [])
  
    return {Singleproduct}
}

export default useGetproduct