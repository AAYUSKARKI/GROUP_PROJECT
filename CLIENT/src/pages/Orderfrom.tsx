import { useState } from "react";
import esewa from '../assets/esewa.jpg'
import Orderedproduct from "./Orderedproduct";
import { useParams,useNavigate } from "react-router-dom";
import useGetcartbyid from "@/hooks/useGetcartbyid";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderForm = () => {

    const { user } = useSelector((state: any) => state.user)
    
    const { id } = useParams();
    const navigate = useNavigate();

// quantity,productid,fullname, address, city, postalCode, country, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice 
  const { cart }:any = useGetcartbyid(id as string); 
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "ESEWA",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(cart?.quantity)
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send data to server
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post("http://localhost:7000/api/v1/orders/createorder",
      {
        fullname: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        productid: cart.product._id,
        quantity: cart.quantity,
        itemsPrice: cart.product.price,
        totalPrice: cart.product.price*cart.quantity,
        taxPrice: 200,
        shippingPrice: 200,
        user:user.user._id
      })
      console.log(response.data)
      toast.success(response.data.message)
      navigate(`/payment/${response.data.data._id}`)
  }
  catch (error) {
      console.log(error)
  }
  }

  return (
    <>
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
    <Orderedproduct cart={cart}/>
    <div className="w-1/2 mx-auto p-8 bg-white shadow-md rounded md:w-[100%]">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter your postal code"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4 flex flex-col justify-center">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <img
                            src={esewa}
                            alt="esewa"
                            className="h-[100px] w-[100px] object-cover"
                        />
                <div className="flex items-center">
                    <input
                     id="paymentMethod"
                     name="paymentMethod"
                     type="checkbox"
                     value="ESEWA"
                     checked={formData.paymentMethod === "ESEWA"}
                     onChange={handleChange}
                     className="mr-2"
                            />
                            <label htmlFor="paymentMethod">Pay with ESEWA</label>
                        </div>
                    </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default OrderForm;
