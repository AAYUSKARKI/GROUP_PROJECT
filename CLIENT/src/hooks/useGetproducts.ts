import {useEffect,useState} from "react";
import axios from "axios";

const useGetproducts = () => {

    const [products, setProducts] = useState([])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:7000/api/v1/products/getallproducts")
        console.log(response.data.data)
        setProducts(response.data.data)
    }

    useEffect(() => {
        getUsers()
    }, [])
  
    return {products}
}

export default useGetproducts