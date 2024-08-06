import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../features/Product/ProductSlice'
import authReducer from '../features/Auth/authSlice'
import cartReducer from '../features/Cart/cartSlice'
import orderReducer from '../features/Orders/orderSlice'
import userReducer, { user } from '../features/User/userSlice'
export default configureStore({
  reducer: {
    product:ProductReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer
  },
})