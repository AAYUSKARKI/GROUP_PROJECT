import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useSelector } from 'react-redux';

interface IProduct {
  _id: string;
  name: string;
  image: string;
}

interface IOrderItem {
  _id: string;
  product: IProduct;
  quantity: number;
}

interface IOrder {
  _id: string;
  status: string;
  orderItems: IOrderItem[];
}

export interface IOrderResponse {
  data: IOrder[];
}

const Vieworder: React.FC = () => {
  const { user } = useSelector((state: any) => state.user)
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrder = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post<IOrderResponse>("https://lucid-merch-2yfv.onrender.com/api/v1/orders/getorders",{user:user.user._id});
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
          <table className="w-full text-md text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 dark:bg-slate-900">
            <thead className="text-xl text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">Product</th>
                <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">Image</th>
                <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">Quantity</th>
                <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                order.orderItems.map(item => (
                  <tr key={item._id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                    <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">{item.product.name}</td>
                    <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">
                      <div className='flex justify-center items-center'><img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" /></div>
                    </td>
                    <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">{item.quantity}</td>
                    <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">{order.status}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vieworder;
