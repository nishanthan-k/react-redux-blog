import { createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
import { sub } from "date-fns";

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

export const updatePost = createAsyncThunk("posts/updatePost", async (postDetails) => {

  try {
    const { postId } = postDetails;
    const response = await axios.put(`${POSTS_URL}/${postId}`, postDetails);
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (postDetails) => {
  try {
    const { postId } = postDetails
    const response = await axios.delete(`${POSTS_URL}/${postId}`);
    if (response?.status === 200) return postDetails

    return `${response?.status} : ${response?.statusText}`
  } catch (err) {
    err.message
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
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.postId) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }

        const { postId } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter(post => post.id !== postId);
        state.posts = [...posts, action.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.postId) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }

        const { postId } = action.payload;
        const posts = state.posts.filter(post => post.id !== postId);
        state.posts = posts;
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

export const selectPostsById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
)


export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const { addPost, addReactions } = postsSlice.actions;

export default postsSlice.reducer;
