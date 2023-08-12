import { Navigate } from "react-router-dom";
import AuthHead from "./authHead";
import Input from "./input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SubmitButton from "./submitButton";

export default function AuthContainer({ login }) {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [repeatPassword, setRepeatPassword] = useState("");
  let [passwordNotMatching, setPasswordNotMatching] = useState(false);
  let [duplicateUsername, setduplicateUsername] = useState(false);
  let [lengthErrorUsername, setLengthErrorUsername] = useState(false);
  let [errorCredentials, setErrorCredentials] = useState(false);

  const submitLoginForm = async function (event) {
    event.preventDefault();
    let response = await fetch("/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status === 200)
    {
      setErrorCredentials(false)
      navigate("/");
      navigate(0); //Triggers Reload
    }
    setErrorCredentials(true);
    return;
  };

  const PasswordsNotMatching = (password1, password2) => {
    if (password1 !== password2) {
      setPasswordNotMatching(true);
      return true;
    } else {
      setPasswordNotMatching(false);
      return false;
    }
  };

  const submitRegisterForm = async function (event) {
    event.preventDefault();
    if (PasswordsNotMatching(password,repeatPassword)) {
      return;
    }
    let response = await fetch("/auth/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status === 201) navigate("/login");
    if (response.status === 409) {
      setduplicateUsername(true);
    }
  };

  const changeUsername = function (event) {
    setUsername(event.target.value);
  };

  const changePassword = function (event) {
    setPassword(event.target.value);
    if (!login) {
      PasswordsNotMatching(event.target.value, repeatPassword);
    }
  };
  const changeRepeatPassword = function (event) {
    setRepeatPassword(event.target.value);
    if (!login) {
      PasswordsNotMatching(event.target.value, password);
    }
  };
  if (login)
    return (
      <div className="container  authContainer mt-5">
        <form
          className="container col col-10 col-md-9 rounded-1 "
          onSubmit={submitLoginForm}
        >
          <AuthHead login={login} />
          <div className="container row bg-secondary">
            <div className="my-2 col col-12 text-center">
              <Input
                classes={
                  "col col-12 col-md-6 bg-dark text-white rounded-1 border-0"
                }
                value={username}
                onChange={changeUsername}
                eman="Username"
                Placeholder={"Username"}
              />
            </div>
          </div>
          <div className="container row bg-secondary">
            <div className="my-2 col col-12 text-center">
              <Input
                classes={
                  "col col-12 col-md-6 bg-dark text-white rounded-1 border-0"
                }
                type={"password"}
                value={password}
                onChange={changePassword}
                eman="Password"
                Placeholder={"Password"}
              />
            </div>
          </div>
          <div className="container row bg-secondary">
            <div className="my-2 col col-12 text-center">
              <SubmitButton
                isEnabled={true}
                type={"submit"}
                value={"Login"}
                classes={
                  "col btn btn-success col-12 col-md-6 rounded-1 border-0 mb-0"
                }
                name={"Login"}
              />
            </div>
            {errorCredentials && (
            <p className="text-danger">Wrong Username or Password.</p>
          )}
          </div>
          <p className="container row bg-secondary text-center">
            <Link className="mb-1 mt-0" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    );

  return (
    <div className="container  authContainer mt-5">
      <form
        className="container col col-10 col-md-9 rounded-1 "
        onSubmit={submitRegisterForm}
      >
        <AuthHead login={login} />
        <div className="container row bg-secondary">
          <div className="my-2 col col-12 text-center">
            <Input
              classes={
                "col col-12 col-md-6 bg-dark text-white rounded-1 border-0"
              }
              value={username}
              onChange={changeUsername}
              eman="Username"
              Placeholder={"Username"}
            />
          </div>
        </div>
        <div className="container row bg-secondary">
          <div className="my-2 col col-12 text-center">
            <Input
              classes={
                "col col-12 col-md-6 bg-dark text-white rounded-1 border-0"
              }
              value={password}
              onChange={changePassword}
              eman="Password"
              type={"password"}
              Placeholder={"Password"}
            />
          </div>
        </div>
        <div className="container row bg-secondary">
          <div className="my-2 col col-12 text-center">
            <Input
              classes={
                "col  col-12 col-md-6 bg-dark text-white rounded-1 border-0"
              }
              value={repeatPassword}
              onChange={changeRepeatPassword}
              type={"password"}
              eman="Password2"
              Placeholder={"Repeat Password"}
            />
          </div>
        </div>
        <div className="container row bg-secondary">
          <div className="my-2 col col-12   text-center">
            <SubmitButton
              isEnabled={!passwordNotMatching && username.length > 0}
              classes={
                "col btn btn-success col-12 col-md-6 rounded-1 border-0 mb-0"
              }
              name={"Register"}
            />
          </div>
          {passwordNotMatching && (
            <p className="text-danger">Your passwords aren't matching!</p>
          )}
          {duplicateUsername && (
            <p className="text-danger">This Username is already in use!</p>
          )}
        </div>
        <p className="container row bg-secondary text-center">
          <Link className="mb-1 mt-0" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
