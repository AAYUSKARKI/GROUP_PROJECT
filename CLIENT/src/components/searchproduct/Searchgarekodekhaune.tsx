import { useState ,useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import HomeCard from '../Card/HomeCard';
function Searchgarekodekhaune() {

    const [searchParams] = useSearchParams();

    const [searchedItems, setSearchedItems] = useState([])

    const keyword = searchParams.get('query')

    useEffect(() => {

        const getProducts = async () => {
            const response = await axios.get(`https://lucidmerch.onrender.com/api/v1/products/searchproduct?key=${keyword}`)
            setSearchedItems(response.data.data)
        }

        getProducts()

    }, [keyword])

  return (
    <>
     {searchedItems.length > 0 && <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">Results for {keyword}</h1>}

     {
     searchedItems?.length > 0 ?(
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px]'>
     {searchedItems?.map((product : any) => <HomeCard key={product._id} product={product} />)}
     </div>)
     : (<h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">No products found with {keyword}</h1>)
     }
    </>
  )
}

export default Searchgarekodekhaune