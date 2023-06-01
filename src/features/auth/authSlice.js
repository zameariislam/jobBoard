import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
      const data = await  signInWithEmailAndPassword(auth, email, password);
  
      return data?.user?.email;
    }
  );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state,action)=>{
        state.email="";
        state.role='';
        state.isLoading=true
        state.error=''
    


    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.error = " ";
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.role = "candidate";
        state.isLoading = false;
        state.error = " ";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.email = "";
        state.role = " ";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.error = " ";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.role = "candidate";
        state.isLoading = false;
        state.error = " ";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.email = "";
        state.role = " ";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

 export const {logout}=authSlice.actions

export default authSlice.reducer;
