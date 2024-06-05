import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addproduct from '@/admin/Addproduct';
import Dashboard from '@/admin/Dashboard';
import Vieworders from '@/admin/Vieworders';
import Home from '@/components/Home/Home';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Viewusers from '@/admin/Viewusers';
import Viewproducts from '@/admin/Viewproducts';
import Updateproduct from '@/admin/Updateproduct';
import Cartsdetail from '@/components/Carts/cartsdetail';
import CardDetailsDisplay from '@/components/Card/CardDetailsDisplay';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
   <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/carts" element={<Cartsdetail />} />
        <Route path="/product/:id" element={<CardDetailsDisplay />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<Addproduct />} />
        <Route path="/admin/view-orders" element={<Vieworders />} />
        <Route path="/admin/view-users" element={<Viewusers />} />
        <Route path="/admin/view-products" element={<Viewproducts />} />
        <Route path="/admin/update-product/:id" element={<Updateproduct />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App