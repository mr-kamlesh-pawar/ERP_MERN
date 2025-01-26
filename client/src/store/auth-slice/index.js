import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

//for register
export const registerUser= createAsyncThunk('auth/register',
    async(FormData)=>{
        const response= await axios.post('http://localhost:5000/api/auth/register', FormData, {withCredentials: true});
        return response.data;
    }
);

//for login
export const loginUser= createAsyncThunk('auth/login',
    async(FormData)=>{
        const response= await axios.post('http://localhost:5000/api/auth/login', FormData, {withCredentials: true});
        return response.data;
    }
);
//for check-auth
export const checkAuth= createAsyncThunk('auth/checkauth',
    async()=>{
        const response= await axios.get('http://localhost:5000/api/auth/check-auth',  
        {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache ,must-revalidate, proxy-revalidate'
                ,Expires:'0'
            }
        
        });

        return response.data;
    }
);




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder)=>{
        //for register
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading= true;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isAuthenticated= false;
            state.user= null;
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading= false;
            state.isAuthenticated= false;
            state.user= null;
        });

//for login
        builder.addCase(loginUser.pending, (state)=>{
            state.isLoading= true;
        }).addCase(loginUser.fulfilled, (state, action)=>{

            state.isLoading= false;
            state.isAuthenticated= action.payload.success;
            state.user= action.payload.success ? action.payload.user : null ;

        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading= false;
            state.isAuthenticated= false;
            state.user= null;
        });

//for checkAuth
        builder.addCase(checkAuth.pending, (state)=>{
            state.isLoading= true;
        }).addCase(checkAuth.fulfilled, (state, action)=>{

            state.isLoading= false;
            state.isAuthenticated= action.payload.success;
            state.user= action.payload.success ? action.payload.user : null ;

        }).addCase(checkAuth.rejected, (state, action)=>{
            state.isLoading= false;
            state.isAuthenticated= false;
            state.user= null;
        });





    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;