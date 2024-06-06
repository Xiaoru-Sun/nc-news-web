import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import ErrorPage from "./ErrorPage";
import { fetchAllUsers } from "../utils/app";
import "./login.css";

function Login(props) {
  const [pickedUser, setPickedUser] = useState({ username: "", name: "" });
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const { userLoggedin, setUserLoggedin, setAccount } =
    useContext(UserLoginContext);
  const { setOnLogin } = props;

  const handleSignIn = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(pickedUser));
    setUserLoggedin(true);
    setOnLogin(false);
  };

  useEffect(() => {
    fetchAllUsers()
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((error) => {
        setError({ error });
      });
  }, []);

  if (userLoggedin) {
    return (
      <>
        <p>{pickedUser.username} is signed in!</p>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <div id="signin-container">
      <section id="signin-section">
        <p className="pickuser-text">Choose An User To Log In</p>
        {allUsers.length ? (
          <ol start={0} className="flex-container">
            {allUsers.map((user, index) => {
              return (
                <li
                  key={index}
                  className="flex-item"
                  onClick={() => {
                    setPickedUser(user);
                  }}
                >
                  <img
                    alt={`avartar image of the user ${user.username}`}
                    src={user.avatar_url}
                    className="avatar-img"
                  ></img>
                  <p className="username">{user.name}</p>
                </li>
              );
            })}
          </ol>
        ) : null}

        <form
          className="form"
          onSubmit={(e) => {
            handleSignIn(e);
          }}
        >
          <input
            className="login-username"
            type="text"
            defaultValue={pickedUser.username}
            autoComplete="current-username"
            placeholder="username"
            required
          ></input>
          <input
            className="login-name"
            type="text"
            defaultValue={pickedUser.name}
            autoComplete="current-password"
            placeholder="name"
            required
          ></input>

          <button id="signin-button" type="submit">
            Continue
          </button>
        </form>
      </section>
      {error && <ErrorPage errorMessage={error.error.message} />}
    </div>
  );
}

export default Login;
