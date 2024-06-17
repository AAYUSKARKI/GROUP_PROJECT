import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface MyData {
  // Define the structure based on your parsed JSON data
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}

function Ordergarekoherney() {

  const navigate = useNavigate();
  const [response, setResponse] = useState<string>('');
  const [searchParams] = useSearchParams();

  // Extract the encoded data from the URL search parameters
  const encodedData = searchParams.get('data');
  console.log(encodedData)
  let data: MyData | undefined;

  if (encodedData) {
    try {
      const decodedQuery = atob(encodedData); // Decode the Base64 string
      data = JSON.parse(decodedQuery) as MyData; // Parse the JSON string with explicit type
    } catch (error) {
      console.error('Error decoding or parsing the data:', error);
    }
  }

  const getResponse = async () => {
    try {
      if (data) {
        axios.defaults.withCredentials=true
        const res = await axios.post<{ data: string }>('https://group-project-3-li5z.onrender.com/api/v1/orders/verify', data);
        setResponse(res.data.data);
        console.log(response)
      }
    } catch (error) {
      console.error('Error fetching the response:', error);
    }
  };
    useEffect(()=>{
    if (data) {
      getResponse();
    }
  },[])

  return (
    <>
      <div className="text-2xl flex items-center justify-center">
        Order {data?.status}
      </div>
      <div onClick={()=>{navigate('/vieworders')}} className="bg-slate-800 text-lg p-2 m-2 flex text-white justify-center items-center">
<p>View your</p><p className="p-4 text-xl text-green-400 cursor-pointer">Orders</p><p>Here</p>
      </div>
    </>
  );
}

export default Ordergarekoherney;
