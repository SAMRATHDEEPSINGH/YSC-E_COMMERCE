import Navbar from "../components/Navbar/Navbar"
import ProductList from "../components/Product/ProductList"
import Footer from "../common/Footer"



function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default Home
