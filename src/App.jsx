import { Navigate, Route, Routes } from "react-router-dom";
import AddPostForm from "./features/posts/components/AddPostForm";
import PostsList from "./features/posts/components/PostsList";
import SinglePostPage from "./features/posts/components/SinglePostPage";
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/components/EditPostForm";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />

          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="/user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>

      // used replace so this wrong/unknown route entry doesn't gets added to history
      <Route path="*" element={<Navigate to="/" replace />} /> 
    </Routes>
  );
}

export default App;
