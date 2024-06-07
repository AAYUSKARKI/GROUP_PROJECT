
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
import Category from "../categoryFilter/Category"
import HomeDisplay from "../slideDisplay/HomeDisplay"
import {useSelector } from "react-redux"
import FashionCard from "../categoryFilter/Fashioncard"

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

  const {products} = useSelector((state: any) => state.products)
  return (
   <>
   <Category/>
   <HomeDisplay/>
   <h1 className="text-3xl font-bold underline text-left text-slate-900 dark:text-slate-50">Fashion</h1>
   {
    products?.length > 0 ? (
      products?.filter((product : Product) => product.category === "fashion").map((product : Product) => (
        <FashionCard key={product._id} product={product} />
      ))
    ) : (
      <div className="flex justify-center items-center text-3xl">
        <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">
          No products found with category fashion
        </h1>
      </div>
    )
   }
   <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[7px] ">
   <HomeCards/>
   </div>
   </>
  )
}

export default Home