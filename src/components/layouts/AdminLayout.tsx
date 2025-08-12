import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="p-20">
      <h1>Admin Layout</h1>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
