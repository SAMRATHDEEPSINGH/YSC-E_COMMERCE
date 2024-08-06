import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { createOrder,fetchAllOrders, updateOrder } from './orderApi';

const initialState={
    status:'idle',
    orders:[],
    currentOrder:null,
    totalOrders:0
}

export const createOrderAsync=createAsyncThunk(
    'order/createOrder',
    async(order)=>{
        const response=await createOrder(order);
        return response.data
    }
);

export const fetchAllOrdersAsync=createAsyncThunk(
    'order/fetchAllOrders',
    async({sort,pagination})=>{
        const response=await fetchAllOrders(sort,pagination);
        return response.data
    }
);

export const updateOrdersAsync=createAsyncThunk(
    'order/updateOrders',
    async(order)=>{
        const response=await updateOrder(order);
        return response.data
    }
);

export const order=createSlice({
    name:'order',
    initialState,
    reducers:{
        resetOrder:(state)=>{
            state.currentOrder=null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.orders.push(action.payload);
            state.currentOrder=action.payload;
        })
        .addCase(fetchAllOrdersAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.orders=action.payload.orders;
            state.totalOrders=action.payload.totalOrders;
        })
        .addCase(updateOrdersAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(updateOrdersAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.orders.findIndex(order=>order.id===action.payload.id)
            state.orders[index]=action.payload
        })}
})


export const {resetOrder}=order.actions

// export const selectOrders=(state)=>state.order.orders
export const selectCurrentOrder=(state)=>state.order.currentOrder;
export const selectOrders=(state)=>state.order.orders;
export const selectTotalOrders=(state)=>state.order.totalOrders;
export const selectStatusOrder=(state)=>state.order.status;


export default order.reducer