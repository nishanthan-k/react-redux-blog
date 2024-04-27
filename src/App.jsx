import { Route, Routes } from "react-router-dom";
import AddPostForm from "./features/posts/components/AddPostForm";
import PostsList from "./features/posts/components/PostsList";
import SinglePostPage from "./features/posts/components/SinglePostPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />

          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
