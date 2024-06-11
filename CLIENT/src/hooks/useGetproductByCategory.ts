import {useEffect,useState} from "react";
import axios from "axios";

// Define the interface for Product within Cart
interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discount: number;
    quantity: number;
    color: string;
    size: string[];
    image: string;
}

const useGetproductByCategory = (category : string) => {

    const [filteredData, setFilteredData] = useState([] as Product[]);

    const getProductsByCategory = async () => {
        try {
            axios.defaults.withCredentials = true
          const response = await axios.get(`https://lucidmerch.onrender.com/api/v1/products/getproductbycategory/${category}`);
          setFilteredData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getProductsByCategory();
    }, [category])
  
    return {filteredData}
}

export default useGetproductByCategory