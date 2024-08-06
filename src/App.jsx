import React, { useEffect } from "react";
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./components/Auth/Protected";
import {selectLoggedInUser} from './features/Auth/authSlice'
import { fetchItemsByUserIdAsync } from "./features/Cart/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Route,
  } from "react-router-dom";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/User/userSlice";
import Logout from './components/Auth/Logout';
import ForgetPswd from "./pages/ForgetPswd";
import ProtectedAdmin from './components/Auth/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome/></ProtectedAdmin>,
  },
  {
    path:"/login",
    element: <LoginPage/>
  },
  {
    path:"/signup",
    element: <SignUpPage/>
  },
  {
    path:"/cart",
    element: <Protected><CartPage/></Protected>
  },
  {
    path:"/checkout",
    element: <Protected><CheckoutPage/></Protected>
  },
  {
    path:"/product-detail/:id",
    element: <Protected><ProductDetailPage/></Protected>
  },
  {
    path:"/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>
  },
  {
    path:"/admin/product-form",
    element: <ProtectedAdmin><ProductFormPage/></ProtectedAdmin>
  },
  {
    path:"/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>
  },
  {
    path:"/admin/product-form/edit/:id",
    element: <ProtectedAdmin><ProductFormPage/></ProtectedAdmin>
  },
  {
    path:"/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path:"/orders",
    element: <UserOrderPage></UserOrderPage>
  },
  {
    path:"/profile",
    element: <UserProfilePage></UserProfilePage>
  },
  {
    path:"/logout",
    element: <Logout/>
  },
  {
    path:"/forgot-password",
    element: <ForgetPswd/>
  },
  {
    path:"*",
    element: <PageNotFound></PageNotFound>
  },
]);


function App() {
  const user=useSelector(selectLoggedInUser)
  const dispatch=useDispatch();
  useEffect(()=>{
    if (user && user.id) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
