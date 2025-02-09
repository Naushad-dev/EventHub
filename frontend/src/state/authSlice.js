import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { Register } from "../utils/FetchAPI";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      if (!formData) return;
      const { name, email, password, role } = formData;
      console.log("log from AST", formData)
    //   const response = await Register(name, email, password, role);
    const res= await axios.post("http://localhost:3000/api/v1/user/register",{name,email,password,role})
      console.log("register response", res)

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        console.log("response from the fullfilled",action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(RegisterUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
