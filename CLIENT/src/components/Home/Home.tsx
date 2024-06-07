
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
import HomeDisplay from "../slideDisplay/HomeDisplay"
function Home() {
  return (
   <>
   <HomeDisplay/>
  <div className="flex gap-[10px] overflow-scroll scrollbar-hide">
  <HomeCards/>
  </div>
   {/* <Cards/> */}
   </>
  )
}

export default Home