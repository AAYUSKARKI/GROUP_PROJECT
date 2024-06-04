import Addproduct from "@/admin/Addproduct";
import Dashboard from "@/admin/Dashboard";
import Vieworders from "@/admin/Vieworders";
import App from "@/App";
import Home from "@/components/Home/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Viewusers from "@/admin/Viewusers";
import Viewproducts from "@/admin/Viewproducts";
import {  createBrowserRouter } from "react-router-dom";
import path from "path";
import Cartsdetail from "@/components/Carts/cartsdetail";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:"",
                element: <Home/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"signup",
                element: <SignUp/>
            },
            {
                path:'carts',
                element:<Cartsdetail/>
                },
            {
                path:"admin",
                children:[
                    {
                        path:"dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path:'add-product',
                        element: <Addproduct/>
                    },
                    {
                        path:'orders',
                        element: <Vieworders/>
                    },
                    {
                        path:'users',
                        element: <Viewusers/>
                    },
                    {
                        path:'products',
                        element: <Viewproducts/>
                    },
                ]
                
            },
        ],
    }
])

export default router;