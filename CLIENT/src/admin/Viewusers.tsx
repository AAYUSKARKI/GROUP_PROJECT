import  useGetusers  from "../hooks/useGetusers"
function Viewusers() {

    interface User {
        _id: string;
        username: string;
        email: string;
        role: string;
        isVerified: boolean;
      }

    const {users} = useGetusers() as {users: User[]};
    console.log(users)
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
                            <button className="text-blue-500 ">EDIT</button>
                            <button className="text-red-500">DELETE</button>
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