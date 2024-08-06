import Footer from "../common/Footer"
import Navbar from "../components/Navbar/Navbar"
import ProductDetail from "../components/Product/ProductDetail"


function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage
