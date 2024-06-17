import {useEffect,useState} from "react";
import axios from "axios";

interface User {
    _id: string
    username: string
    avatar:string
    email: string
    password: string
    isAdmin: boolean
    createdAt: string
    updatedAt: string
    __v: number
}
const useGetuserByid = (id : string) => {

    const [user, setUser] = useState({} as User)

    const getUser = async () => {
        const response = await axios.get("https://group-project-3-li5z.onrender.com/api/v1/users/getuserbyid/"+id)
        console.log(response.data.data)
        setUser(response.data.data)
    }

    useEffect(() => {
        getUser()
    }, [id])
  
    return {user}
}

export default useGetuserByid