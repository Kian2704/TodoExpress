import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
export default function Header() {
  const context = useContext(UserContext);

  if (context.user !== null)
    return (
      <div className="headline mb-4">
        <h1>
          <Link to="/">ToDo List</Link>
          <Link
            to="/newlist"
            className="btn btn-primary text-black float-end mt-2 me-2 me-md-3"
          >
            Create List
          </Link>
        </h1>
      </div>
    );

  return (
    <div className="headline mb-4">
      <h1>
        <Link to="/">ToDo List</Link>
      </h1>
    </div>
  );
}
