import AddPostForm from "./features/posts/components/AddPostForm";
import PostsList from "./features/posts/components/PostsList";

function App() {
  return (
    <div className="bg-slate-300 w-screen flex flex-col items-center">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
