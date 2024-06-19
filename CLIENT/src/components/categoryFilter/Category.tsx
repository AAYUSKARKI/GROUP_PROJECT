import axios from "axios"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

function Category() {
  const {theme} = useSelector((state : any) => state.theme);
    const navigate = useNavigate()
    const [filteredData, setFilteredData] = useState([] as Product[]);
    const categoriesList = [
        'Electronics',
        'Fashion',
        'Home & Garden',
        'Health & Beauty',
        'Sports & Outdoors',
        'Toys & Games',
        'Automotive',
        'Books & Media',
        'Groceries & Gourmet Food',
        'Office Supplies'
      ];

      console.log(filteredData)

    const getProductsByCategory = async (category: string) => {
        try {
          const response = await axios.get(`https://lucid-merch-2yfv.onrender.com/api/v1/products/getproductbycategory/${category}`);
          setFilteredData(response.data.data);
          navigate(`/category/${category}`);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className={`${theme==="light"?"bg-slate-50":"bg-slate-950"} hidden md:flex justify-center items-center gap-2 lg:gap-8 p-2 w-full`}>
        {
            categoriesList.map((category) => (
                <div className="p-2 rounded-md" key={category}>
                    <p onClick={() => getProductsByCategory(category)} className={`${theme==="light"?"text-black":"text-white"} hover:text-blue-500 hover:scale-110 cursor-pointer tracking-wide`}>{category}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Category