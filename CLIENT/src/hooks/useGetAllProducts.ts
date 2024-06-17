import {useEffect} from "react";
import axios from "axios";
import { setproduct } from "@/redux/ProductSlice";
import { useDispatch } from "react-redux";


const useGetallproducts = () => {
    const dispatch = useDispatch()
    const getallproducts = async () => {
        const response = await axios.get("https://group-project-3-li5z.onrender.com/api/v1/products/allproducts")
        console.log('response from products',response.data.data)
        dispatch(setproduct(response.data.data))
    }

    useEffect(() => {
        getallproducts()
    }, [])
}

export default useGetallproducts