import { useState } from "react";
import esewa from '../assets/esewa.jpg'
import Orderedproduct from "./Orderedproduct";
import { useParams } from "react-router-dom";
import useGetcartbyid from "@/hooks/useGetcartbyid";

const OrderForm = () => {

    const { id } = useParams();


  const { cart } = useGetcartbyid(id as string);
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

  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send data to server
    console.log(formData);
  };

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
