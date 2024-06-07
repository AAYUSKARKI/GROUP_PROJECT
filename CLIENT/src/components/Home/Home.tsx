
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
function Home() {
  return (
   <>
  <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[7px] ">
  <HomeCards/>
  </div>
   {/* <Cards/> */}
   </>
  )
}

export default Home