import { Outlet,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
function App() {
  const location = useLocation();
  const hideNavbarPaths = new Set([
    '/admin/dashboard',
    '/admin/add-product',
    '/admin/orders'
  ]);

  const hideNavbar = hideNavbarPaths.has(location.pathname);
  
  return (
   <>
   {!hideNavbar && <Navbar/>}
   <main>
    <Outlet/>
   </main>
   </>
  );
}

export default App