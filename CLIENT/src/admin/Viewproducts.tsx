import useGetproducts from "@/hooks/useGetproducts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Viewproducts() {

    interface Product {
                _id: string,
                name: string,
                description: string,
                category: string,
                price: number,
                discount: number,
                quantity: number,
                color: string,
                size: string[],
    }

    const {products} = useGetproducts() as {products: Product[]};
    const navigate = useNavigate()

    const handleUpdate = (id: string) => {
        navigate(`/admin/update-product/${id}`)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:7000/api/v1/products/deleteproduct/${id}`)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
    <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">ALL PRODUCTS OF THE LUCIDMERCH</h1>
    <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
        <table className="w-full text-sm text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 dark:bg-slate-900">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                <tr>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                            NAME
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        DESCRIPTION
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        CATEGORY
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        PRICE
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        DISCOUNT
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        QUANTITY
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        COLOR
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        SIZE
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        ACTION
                    </th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((product)=>(
                    <tr key={product._id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.name}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.description}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.category}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.price}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.discount}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.quantity}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.color}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {product.size}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700 flex gap-2 items-center justify-center">
                            <button className="text-blue-500 " onClick={() => handleUpdate(product._id)}>EDIT</button>
                            <button className="text-red-500" onClick={() => handleDelete(product._id)}>DELETE</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Viewproducts