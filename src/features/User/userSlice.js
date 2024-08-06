import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { fetchLoggedInUserOrders,updateUser,fetchLoggedInUser } from './userApi';


const initialState={
    status:'idle',
    userOrder:[],
    userInfo:null
}


export const fetchLoggedInUserOrdersAsync=createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async(userId)=>{
        const response=await fetchLoggedInUserOrders(userId);
        return response.data
    }
);
export const fetchLoggedInUserAsync=createAsyncThunk(
    'user/fetchLoggedInUser',
    async(userId)=>{
        const response=await fetchLoggedInUser(userId);
        return response.data
    }
);


export const updateUserAsync=createAsyncThunk(
    'user/updateUser',
    async(userId)=>{
        const response=await updateUser(userId);
        return response.data
    }
);


export const user=createSlice({
    name:'user',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.userOrder=action.payload
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.userInfo=action.payload
        })
        .addCase(fetchLoggedInUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.userInfo=action.payload
        })
    }}
);

export const {increment}=user.actions

export const selectedOrder=(state)=>state.user.userOrder;
export const selectedInfo=(state)=>state.user.userInfo;

export default user.reducer