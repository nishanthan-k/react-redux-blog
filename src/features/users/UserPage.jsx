import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, Number(userId)));
  // const allPosts = useSelector(selectAllPosts);

  // const userPosts = allPosts.filter(post => post.userId === Number(userId)).sort((a, b) => a.date - b.date);

  const userPosts = useSelector(state => {
    const posts = selectPostsByUser(state, Number(userId))
    console.log(posts, posts.sort((a, b) => a.date - b.date));
    return posts.sort((a, b) => a.date - b.date);
  })

  // const userPosts1 = useSelector(state => selectPostsByUser(state, Number(userId))).sort((a, b) => b.date - a.date);


  console.log(userPosts);

  const renderPostTitles = userPosts.map((post, index) => (
    <li key={post.id} className="mt-2 px-3">
      <Link to={`/post/${post.id}`} className="text-lg hover:text-slate-700" >{`${index + 1}. ${post.title}`}</Link>
    </li>
  ))

  return (
    <section className="mt-3 px-10 flex flex-col items-center" >
      <h2 className="text-2xl font-medium" >{user?.name}</h2>
      {userPosts && (
        <div className="mt-2">
          <p className="self-start text-xl font-medium" >User Posts</p>
          <ol>{renderPostTitles}</ol>
        </div>
      )}
    </section>
  )
}

export default UserPage