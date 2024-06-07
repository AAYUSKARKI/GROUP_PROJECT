import React from "react";
import useGetproductByCategory from "@/hooks/useGetproductByCategory";
import { useParams } from "react-router-dom";
import Categorycard from "./CATEGORYCARD";

const Categorycards: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  console.log('params of category', category)
  const { filteredData } = useGetproductByCategory(category as string);

  return (
    <>
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <Categorycard key={product._id} product={product} />
        ))
      )
       : (
        <div className="flex justify-center items-center text-3xl">
          <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">
            No products found with category {category}
          </h1>
        </div>
      )}
    </>
  );
};

export default Categorycards;
