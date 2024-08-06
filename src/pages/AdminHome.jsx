import Navbar from "../components/Navbar/Navbar"
import AdminProductList from "../components/Admin/AdminProductList"



function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  )
}

export default AdminHome
