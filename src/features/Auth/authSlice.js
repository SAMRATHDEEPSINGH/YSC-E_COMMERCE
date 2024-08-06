import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { createUser,checkUser,signOut} from './authApi'
import { updateUser } from '../User/userApi';

const initialState={
    loggedInUser:0,
    status:'idle',
    error:null
}
export const createUserAsync=createAsyncThunk(
    'user/createUser',
    async(userData)=>{
        const response=await createUser(userData);
        return response.data
    }
);

export const checkUserAsync=createAsyncThunk(
    'user/checkUser',
    async(loginInfo)=>{
        const response=await checkUser(loginInfo);
        return response.data
    }
);


export const updateUserAsync=createAsyncThunk(
    'user/updateUser',
    async(update)=>{
        const response=await updateUser(update);
        return response.data
    }
);



export const signOutAsync=createAsyncThunk(
    'user/signOut',
    async(userId)=>{
        const response=await signOut(userId);
        return response.data
    }
);
export const auth=createSlice({
    name:'user',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUser=action.payload
        })
        .addCase(checkUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUser=action.payload
        })
        .addCase(checkUserAsync.rejected,(state,action)=>{
            state.status='idle';
            state.error=action.error
        })
        .addCase(updateUserAsync.pending,(state,action)=>{
            state.status='idle';
        })
        .addCase(signOutAsync.pending,(state,action)=>{
            state.status='idle';
        })
        .addCase(signOutAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUser=null;
        })
    }
})

export const {increment}=auth.actions
export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const selectError=(state)=>state.auth.error;


export default auth.reducer