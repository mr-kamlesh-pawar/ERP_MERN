import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 

const initialState={
    isLoading:false,
    productList:[]
}

//add products
export const addNewProduct= createAsyncThunk( "/products/addnewproduct",
    async (FormData)=>{
        const result = await axios.post('http://localhost:5000/api/admin/products/add', FormData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result?.data;
    }
);


//get products
export const fetchAllProducts= createAsyncThunk( "/products/fetchAllProducts",
    async () => {
        try {
          const result = await axios.get('http://localhost:5000/api/admin/products/get');
          
          return result?.data;
        } catch (err) {
          console.error('Error fetching products:', err);
          throw err;
        }
      }
      
);


//Edit a  products
export const editProduct= createAsyncThunk( "/products/editProduct",
    async ({id,FormData})=>{
        const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, FormData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result?.data;
    }
);


//delete a  product
export const deleteProduct= createAsyncThunk( "/products/deleteProduct",
    async (id)=>{
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        return result?.data;
    }
);



 const adminProductSlice= createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state)=> {
            state.isLoading = true;

        })
        .addCase(fetchAllProducts.fulfilled, (state, action)=>{

            console.log(action.payload);
            state.isLoading=false;
            state.productList= action.payload?.data;
            //console.log(action.payload);
        })
        .addCase(fetchAllProducts.rejected, (state, action)=>{

         
            state.isLoading=false;
            state.productList= [];
        })

    }

 })


 export default adminProductSlice.reducer;