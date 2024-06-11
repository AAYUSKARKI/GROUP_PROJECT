import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setuser } from "@/redux/userSlice";

const useGetgoogleloginuser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getuser = async () => {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get("https://lucidmerch.onrender.com/auth/user")
                console.log(res.data)
                dispatch(setuser(res.data))
            } catch (error) {
                console.log(error)  
            }
        }
        getuser()
    }, [])

    return {}
}

export default useGetgoogleloginuser