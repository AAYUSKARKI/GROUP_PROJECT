import App from "@/App";
import Home from "@/components/Home/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
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
                path:"Login",
                element: <Login/>
            },
            {
                path:"Sign-up",
                element: <SignUp/>
            }
        ]
    }
])

export default router;