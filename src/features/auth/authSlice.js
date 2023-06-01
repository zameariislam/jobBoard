import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};


// const  = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {


  },
});

export default authSlice.reducer;
