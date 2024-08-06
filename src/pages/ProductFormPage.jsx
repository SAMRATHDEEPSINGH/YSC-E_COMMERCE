import Navbar from "../components/Navbar/Navbar"
import ProductForm from "../components/Admin/ProductForm"



function AdminHome() {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  )
}

export default AdminHome