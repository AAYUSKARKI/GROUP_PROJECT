import HomeCards from "../Cards/Homecards"
import Category from "../categoryFilter/Category"
import Pagination from "../Pagination/Pagination"

function Shop() {
  return (
    <>
     <div className="flex flex-col items-center justify-center">
     <Category/>
      <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px] ">
     <HomeCards/>
   </div>
    <Pagination/>
   </div>
   </>
  )
}

export default Shop