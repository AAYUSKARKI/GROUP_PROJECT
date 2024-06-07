
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
import HomeDisplay from "../slideDisplay/HomeDisplay"
function Home() {
  return (
   <>
   <HomeDisplay/>
  <div className="flex gap-[10px] overflow-scroll scrollbar-hide">
  <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[7px] ">
  <HomeCards/>
  </div>
   {/* <Cards/> */}
   </>
  )
}

export default Home