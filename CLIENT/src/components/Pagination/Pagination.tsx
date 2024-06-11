import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../Card/HomeCard";
import axios from "axios";

function Pagination() {
  const { products } = useSelector((state: any) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setTotalProducts(products.length);
    }
  }, [products]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalProducts / calculateLimit(currentPage));
    setTotalPages(totalPagesCount);
  }, [totalProducts, currentPage]);

  const calculateLimit = (page: number) => {
    // Start with a base limit of 10 items per page and increase it by 10 for each subsequent page
    return 10 + (page - 1) * 8;
  };

  const fetchPaginatedProducts = async () => {
    try {
      const response = await axios.get(
        `https://lucidmerch.onrender.com/api/v1/products/getallproducts?page=${currentPage}&limit=${calculateLimit(currentPage)}`
      );
      setPaginatedProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchPaginatedProducts();
  }, [currentPage, totalProducts]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="gap-[10px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[7px] ">
        {paginatedProducts.map((product: any) => (
          <HomeCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mr-2 px-4 py-2 rounded-md ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mr-2 px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
      <p className="mt-4">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default Pagination;
