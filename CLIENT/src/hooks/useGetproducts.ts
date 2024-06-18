import {useEffect,useState} from "react";
import axios from "axios";
// import { setproduct } from "@/redux/ProductSlice";

const useGetproducts = (currentpage:number,limit:number) => {

    const [products, setProducts] = useState([])

    const getUsers = async () => {
        const response = await axios.get("https://lucid-merch-2yfv.onrender.com/api/v1/products/getallproducts?page="+currentpage+"&limit="+limit)
        console.log('response from products',response.data.data)
        setProducts(response.data.data)
    }

    useEffect(() => {
        getUsers()
    }, [currentpage,limit])
  
    return {products}
}

export default useGetproducts