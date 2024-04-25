import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "React", content: "Frontend Library" },
  { id: 2, title: "Redux", content: "State management library for javascript" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
