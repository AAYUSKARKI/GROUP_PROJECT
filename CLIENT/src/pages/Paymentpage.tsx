import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";

function Paymentpage() {
  // Generate a unique transaction UUID

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [orderDetail, setOrderDetail] = useState({} as any);

  useEffect(() => {
    // Make an API call to get the order details
    async function getDetails() {

      setLoading(true);
      const response = await axios.get(`https://group-project-3-li5z.onrender.com/api/v1/orders/getorderbyid/${id}`);

      console.log(response.data.data);

      setOrderDetail(response.data.data);

      setLoading(false);

    }
    getDetails();
  }, []);
      
  // const signedFieldNames = [
  //  orderDetail.totalPrice,
  //  orderDetail._id,
  //  orderDetail.product_code,
  // ].join(",");
  return (
    <>
    {loading && <p className="text-md flex justify-center">Loading...</p>}
<div className="flex flex-col justify-center items-center p-2 gap-1 mt-10">
      {/* {orderDetail && <p className="text-md flex justify-center">Product Name: {orderDetail?.orderItems[0]?.product.name ? orderDetail?.orderItems[0].product.name : "N/A"}</p>} */}
      <p className="text-md flex justify-center">NPR {orderDetail.total_amount}</p>
      {/* {orderDetail.orderItems[0].product.image && <img className="w-[300px] h-[300px]" src={orderDetail.orderItems[0].product.image} alt="image" />} */}
      {/* <h1>{orderDetail.}</h1> */}
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <input type="hidden" id="amount" name="amount" value={orderDetail.totalPrice} required />
        <input type="hidden" id="tax_amount" name="tax_amount" value='0' required />
        <input type="hidden" id="total_amount" name="total_amount" value={orderDetail.total_amount} required />
        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={orderDetail.transaction_uuid} required />
        <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
        <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value='0' required />
        <input type="hidden" id="success_url" name="success_url" value="http://localhost:5173/checkout" required />
        <input type="hidden" id="failure_url" name="failure_url" value="http://localhost:5173/" required />
        <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required/>
        <input type="hidden" id="signature" name="signature" value={orderDetail.signature} required />
        <input className="btn btn-primary flex justify-center items-center" value="Proceed to Payment" type="submit"  />
      </form>
      </div>
    </>
  );
}

export default Paymentpage;
