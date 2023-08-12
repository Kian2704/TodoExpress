import Header from "../components/header";
import NewListContainer from "../components/newListContainer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
export default function NewList({ fetchHomeLists }) {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (context.user === null && !context.isLoading) navigate("/login");
    return;
  }, [context.isLoading]);

  if (context.isLoading)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  if (context.user !== null)
    return (
      <div className="newList">
        <header>
          <Header />
        </header>
        <NewListContainer fetchHomeLists={fetchHomeLists} />
      </div>
    );
}
