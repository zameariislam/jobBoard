import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      });
  },
});

export default authSlice.reducer;
