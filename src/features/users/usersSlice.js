import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = []

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (err) {
      return err.message;
  }
})

// useEffect(() => fetchUsers(), [])

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
  }
})

export const selectAllUsers = state => state.users;

export default usersSlice.reducer;