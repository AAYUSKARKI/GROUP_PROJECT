
// import Cards from '@/components/Cards/Cards'
import HomeCards from "../Cards/Homecards"
function Home() {
  return (
   <>
  <div className="flex gap-[10px] overflow-scroll scrollbar-hide">
  <HomeCards/>
  </div>
   {/* <Cards/> */}
   </>
  )
}

export default Home