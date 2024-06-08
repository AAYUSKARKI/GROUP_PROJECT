
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
import Category from "../categoryFilter/Category"
import HomeDisplay from "../slideDisplay/HomeDisplay"
import {useSelector } from "react-redux"
import FashionCard from "../categoryFilter/Fashioncard"
import useGetallproducts from "@/hooks/useGetAllProducts"
import Pagination from "../Pagination/Pagination"

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
function Home() {


    useGetallproducts()
  

  const {products} = useSelector((state: any) => state.products)
  const Fashionitems= products?.filter((product : Product) => product.category.includes("Fashion")).slice(0, 4)
  // console.log(Fashionitems)
  const Electronicsitems= products?.filter((product : Product) => product.category.includes("Electronics")).slice(0, 4)
  return (
   <>
   <div className="flex flex-col items-center justify-center">
   <Category/>
   <HomeDisplay/>
   {Fashionitems && <h1 className="text-3xl font-bold underline text-left text-slate-900 dark:text-slate-50">Fashion</h1>}
   {
  Fashionitems?.length > 0 ? ( // Check if there are fashion items available
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px]">
      {Fashionitems.map((product : Product) => ( // Map through the fashion items
        <FashionCard key={product._id} product={product} /> // Render a FashionCard component for each item
      ))}
    </div>
  ) : ( // If no fashion items are found
    <div className="flex justify-center items-center text-3xl">
      <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">
        No products found with category fashion
      </h1>
    </div>
  )
}
{Electronicsitems && <h1 className="text-3xl font-bold underline text-left text-slate-900 dark:text-slate-50">Electronics</h1>}
   {
  Electronicsitems?.length > 0 ? ( // Check if there are fashion items available
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px]">
      {Electronicsitems.map((product : Product) => ( // Map through the fashion items
        <FashionCard key={product._id} product={product} /> // Render a FashionCard component for each item
      ))}
    </div>
  ) : ( // If no fashion items are found
    <div className="flex justify-center items-center text-3xl">
      <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">
        No products found with category Electronics
      </h1>
    </div>
  )
}

   <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px] ">
   <HomeCards/>
   </div>
   <Pagination/>
   </div>
   </>
  )
}

export default Home