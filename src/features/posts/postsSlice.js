import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns"

const initialState = [
  { id: 1,
    title: "React",
    content: "Frontend Library",
    date: sub(new Date(), { minutes: 7 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0
    }
  },
  { id: 2,
    title: "Redux",
    content: "State management library for javascript",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0
    } 
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId, reactions) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0
            },
          }
        }
      }
    },
    addReactions: {
      reducer(state, action) {
        const {postId, reaction} = action.payload;
        const existingPost = state.find(post => post.id === postId);

        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      }
    }
  },
});

export const { addPost, addReactions } = postsSlice.actions;

export default postsSlice.reducer;
