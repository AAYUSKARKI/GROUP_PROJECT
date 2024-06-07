import axios from "axios"
import { useState } from "react";
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
          const response = await axios.get(`http://localhost:7000/api/v1/products/getproductbycategory/${category}`);
          setFilteredData(response.data.data);
          navigate(`/category/${category}`);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="flex justify-center items-center gap-8 bg-slate-600 p-2">
        {
            categoriesList.map((category) => (
                <div className=" p-2 rounded-md" key={category}>
                    <p onClick={() => getProductsByCategory(category)} className="text-white hover:scale-110 cursor-pointer tracking-wide">{category}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Category