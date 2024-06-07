import {useEffect,useState} from "react";
import axios from "axios";
import { setproduct } from "@/redux/ProductSlice";
import { useDispatch } from "react-redux";


const useGetproducts = () => {

    const dispatch = useDispatch()

    const [products, setProducts] = useState([])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:7000/api/v1/products/getallproducts")
        console.log('response from products',response.data.data)
        setProducts(response.data.data)
        dispatch(setproduct(response.data.data))
    }

    useEffect(() => {
        getUsers()
    }, [])
  
    return {products}
}

export default useGetproducts