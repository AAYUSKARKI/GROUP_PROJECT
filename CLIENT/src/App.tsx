import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addproduct from '@/admin/Addproduct';
// import Dashboard from '@/admin/Dashboard';
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
import OrderForm from './pages/Orderfrom';
import CategorylandingPage from './components/categoryFilter/CategorylandingPage';
import Paymentpage from './pages/Paymentpage';
import Shop from './components/Shop/Shop';
import Stat from './admin/Stat';
import Vieworder from './pages/Vieworders';
import Adduser from './admin/Adduser';
import Searchgarekodekhaune from './components/searchproduct/Searchgarekodekhaune';
import Updateuser from './admin/Updateuser';
import Ordergarekoherney from '@/pages/Ordergarekoherney'
// import { useSelector } from 'react-redux';
import PrivateRoute from './routes/privateroute';
import AdminRoute from './routes/adminroute';
const App: React.FC = () => {

  // const { user } = useSelector((state: any) => state.user)

  return (
   <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/shop" element={<Shop />} />
            <Route path="/vieworders" element={<Vieworder />} />
            <Route path="/carts" element={<Cartsdetail />} />
            <Route path="/payment/:id" element={<Paymentpage />} />
            <Route path="/order/:id" element={<OrderForm />} />
            <Route path="/checkout" element={<Ordergarekoherney />} />
          </Route>
          <Route path="/product/:id" element={<CardDetailsDisplay />} />
          <Route path="/products/search" element={<Searchgarekodekhaune />} />
          <Route path="/category/:category" element={<CategorylandingPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Stat />} />
            <Route path="/admin/dashboard" element={<Stat />} />
            <Route path="/admin/add-product" element={<Addproduct />} />
            <Route path="/admin/add-user" element={<Adduser />} />
            <Route path="/admin/update-user/:id" element={<Updateuser />} />
            <Route path="/admin/orders" element={<Vieworders />} />
            <Route path="/admin/users" element={<Viewusers />} />

            <Route path="/admin/products" element={<Viewproducts />} />
            <Route path="/admin/update-product/:id" element={<Updateproduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App