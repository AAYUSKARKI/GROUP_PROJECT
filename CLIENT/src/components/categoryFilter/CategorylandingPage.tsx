import Homecards from "../Cards/Homecards"
import HomeDisplay from "../slideDisplay/HomeDisplay"
import Category from "./Category"
import Categorycards from "./Categorycards"


function CategorylandingPage() {
  return (
    <>
    <Category/>
    <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px] ">
        <Categorycards/>
    </div >
    <HomeDisplay/>
    <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">Other Products</h1>
    <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px] ">
        <Homecards/>
    </div>
    </>
  )
}

export default CategorylandingPage