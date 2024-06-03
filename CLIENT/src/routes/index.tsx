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
                    }
                ]
                
            },
        ],
    }
])

export default router;