import {useEffect,useState} from "react";
import axios from "axios";

const useGetusers = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await axios.get("https://group-project-3-li5z.onrender.com/api/v1/users/allusers")
        console.log(response.data.data)
        setUsers(response.data.data)
    }

    useEffect(() => {
        getUsers()
    }, [])
  
    return {users}
}

export default useGetusers