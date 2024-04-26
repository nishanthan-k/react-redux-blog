import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {id: 1, name: "Steve Jobs"},
  {id: 2, name: "Mark Zuckerberg"}
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
})

export const selectAllUsers = state => state.users;

export default usersSlice.reducer;