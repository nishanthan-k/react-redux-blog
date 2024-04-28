import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns"
import axios from 'axios';
import { fetchUsers } from "../users/usersSlice";

const POSTS_URL = "https:jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: 'idle', // 'idle' || 'loading' || ''succeeded' || 'failed'
  error: null
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  } catch (err) {
    return err.message;
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find(post => post.id === postId);

        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0
          }
          return post;
        })

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.err.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log(action.payload)
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0
        }

        console.log(action.payload);
        state.posts.push(action.payload);
      })
  }
});

export const selectAllPosts = (state) => {
  // removing duplicates if have
  const uniquePosts = state.posts.posts.filter((item, index, self) => {
    return index === self.findIndex((t) => (
      t.userId === item.userId && t.id === item.id
    ));
  });

  return uniquePosts;
};

export const selectPostById = (state, postId) => 
  state.posts.posts.find(post => {
    if (post.id === postId) {
      console.log(post)
      return post
    }
  })


export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const { addPost, addReactions } = postsSlice.actions;

export default postsSlice.reducer;
