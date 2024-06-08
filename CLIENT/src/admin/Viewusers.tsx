import  useGetusers  from "../hooks/useGetusers"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function Viewusers() {

    const navigate = useNavigate();
    interface User {
        _id: string;
        username: string;
        email: string;
        role: string;
        isVerified: boolean;
      }

    const {users} = useGetusers() as {users: User[]};
    // console.log(users)

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (confirm) {
          try {
            const response = await axios.delete(`http://localhost:7000/api/v1/users/deleteuser/${id}`);
            if (response.data.success) {
              toast.success(response.data.message);
              console.log(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        }


    }

    const handleUpdate = (id: string) => {
        navigate(`/admin/update-user/${id}`)

    }


  return (
    <>
    <h1 className="text-3xl font-bold underline text-center text-slate-900 dark:text-slate-50">ALL USERS OF THE LUCIDMERCH</h1>
    <div className="flex flex-col items-center justify-center p-4 w-full h-full dark:bg-slate-800 dark:text-slate-50 bg-slate-50">
        <table className="w-full text-sm text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 dark:bg-slate-900">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                <tr>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                            USERNAME
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        EMAIL
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        ROLE
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        ISVERIFIED
                    </th>
                    <th scope="col" className="px-6 py-3 border border-slate-300 dark:border-slate-700">
                        ACTION
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <tr key={user._id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {user.username}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {user.role}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700">
                            {user.isVerified ? 'verified' : 'not verified'}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 dark:border-slate-700 flex gap-2 items-center justify-center">
                            <button className="text-blue-500 "  onClick={() => handleUpdate(user._id)}>EDIT</button>
                            <button className="text-red-500" onClick={() => handleDelete(user._id)}>DELETE</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Viewusers