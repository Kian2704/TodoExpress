import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

import ListContainer from "../components/listContainer";
import { UserContext } from "../userContext";
export default function ListView({ fetchHomeLists, user }) {
  const { id } = useParams();

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
      <div className="ListView">
        <header className="App-header">
          <Header />
        </header>
        <ListContainer
          fetchHomeLists={fetchHomeLists}
          user={user}
          listID={id}
        />
      </div>
    );
}
