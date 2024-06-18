import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios'; 
import toast from 'react-hot-toast';
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

const Vieworders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrder = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get<IOrderResponse>("http://localhost:7000/api/v1/orders/getallorders");
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`http://localhost:7000/api/v1/orders/updateorderstatus/${orderId}`, { status });
      toast.success('Order status updated successfully');
      // Refresh the orders list after updating the status
      getOrder();
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Dashboard />
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
                  <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  order.orderItems.map(item => (
                    <tr key={item._id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                      <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">{item.product.name}</td>
                      <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">
                        <div className="flex justify-center items-center"><img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" /></div>
                      </td>
                      <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">{item.quantity}</td>
                      <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">
                        <select 
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="text-center px-6 py-4 border border-slate-300 dark:border-slate-700">
                        <button 
                          onClick={() => updateOrderStatus(order._id, order.status)}
                          className="text-blue-500 hover:underline"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Vieworders;
