import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderUsers = users.map((user, index) => (
    <li key={user.id} className="mt-2 px-3">
      <Link to={`/user/${user.id}`} className="text-lg hover:text-slate-700" >{`${index + 1}. ${user.name}`}</Link>
    </li>
  ))

  return (
    <section className="mt-3 flex flex-col items-center" >
      <h2 className="text-2xl font-medium" >Users</h2>
      {users && (
        <div className="mt-2">
          <ol>{renderUsers}</ol>
        </div>
      )}
    </section>
  )
}

export default UsersList