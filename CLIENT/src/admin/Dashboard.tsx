import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
function Dashboard() {

    const links = [
        { name: "Home", link: "/" },
        { name: "View Users", link: "/admin/users" },
        { name: "View Products", link: "/admin/products" },
        { name: "View Orders", link: "/admin/orders" },
        { name: "View Reviews", link: "/admin/reviews" },
        { name: "add Product", link: "/admin/add-product" },
        { name: "add User", link: "/admin/add-user" },
        { name: "Logout", link: "/admin/logout" },
    ]
  return (
    <>
    <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><FaBars /></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}

      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.link}>{link.name}</Link>
        </li>
      ))}
      <Link to={"/admin/users"}>{'ViewUsers'}</Link>
    </ul>
  </div>
</div>
</>
  )
}

export default Dashboard