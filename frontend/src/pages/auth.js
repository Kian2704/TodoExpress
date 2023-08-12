import AuthContainer from "../components/authContainer";
import Header from "../components/header";
import PreviewContainer from "../components/previewContainer";
import { Component, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
export default function Auth({ login, user }) {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (context.user !== null && !context.isLoading) navigate("/");
    return;
  }, [context.isLoading]);

  if (context.isLoading)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  if (context.user === null)
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <p className="bg-success"></p>
        </header>
        <AuthContainer login={login} />
      </div>
    );
}
