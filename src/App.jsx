import AddPostForm from "./components/posts/AddPostForm";
import PostsList from "./components/posts/PostsList";

function App() {
  return (
    <div className="bg-slate-300 w-screen h-screen flex flex-col items-center">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
