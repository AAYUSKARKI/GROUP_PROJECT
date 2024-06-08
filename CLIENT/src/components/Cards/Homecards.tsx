import useGetproducts from "@/hooks/useGetproducts";
import HomeCard from "../Card/HomeCard";
function Homecards() {

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

    const {products} = useGetproducts(1,20) as {products: Product[]};


    return (
        <>

            {products.map((product) => (

                <HomeCard key={product._id} product={product}/>

            ))}

        </>

    )
}

export default Homecards