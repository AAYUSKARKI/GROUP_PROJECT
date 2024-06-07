import { Link } from 'react-router-dom'; // Import Link from react-router-dom if using React Router for navigation

function LoginPopup({ isOpen, onClose } : any) {
  const handleClose = () => {
    onClose(); // Call onClose function passed from props to close the popup
  };

  return (
    // Popup content
    <div className={`z-10 fixed bottom-0 left-0 right-0 bg-slate-900 p-4 border-t border-gray-200 ${isOpen ? '' : 'hidden'}`}>
      <p className="text-white text-center text-2xl">You are not logged in. Please <Link to="/login" className="text-blue-500">login</Link>here</p>
      <button onClick={handleClose} className="text-xl bg-red-500 absolute right-0 top-0 text-black ml-auto focus:outline-none">Close</button>
    </div>
  );
}

export default LoginPopup;
