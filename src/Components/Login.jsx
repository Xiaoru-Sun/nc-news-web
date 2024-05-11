import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import ErrorPage from "./ErrorPage";

function Login(props) {
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const { userLoggedin, setUserLoggedin, setAccount } =
    useContext(UserLoginContext);
  const { setOnLogin } = props;

  useEffect(() => {
    if (allUsers.length > 0 && userName) {
      // Check if allUsers is not empty
      const matchedUser = allUsers.filter((obj) => obj.username === userName);
      if (matchedUser) {
        setUserLoggedin(true);
        const avatar_url = matchedUser[0].avatar_url;
        setAccount({ userName, userPassword, avatar_url });
        setOnLogin(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName,
            userPassword,
            avatar_url,
          })
        );

        // Perform actions for valid user
      } else {
        setError({ error: { message: "invalid username or password" } });
        // Perform actions for invalid user
      }
    }
  }, [allUsers, userName]);

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .get(`https://project-nc-news-xiaoru-sun.onrender.com/api/users`)
      .then((res) => {
        // let allNames = res.data.users.map((obj) => obj.username);
        setAllUsers((preAllUsers) => {
          const currAllUsers = [...preAllUsers, ...res.data.users];
          return currAllUsers;
        });
      })
      .catch((error) => {
        setError({ error });
      });
  };

  if (userLoggedin) {
    return (
      <>
        <p>{userName} is signed in!</p>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <div id="signin-container">
      <section id="signin-section">
        <h2 id="signin-h2">Sign In</h2>
        <form
          onSubmit={(e) => {
            handleSignIn(e);
          }}
        >
          <label className="signin-label" htmlFor="username">
            Username
          </label>
          <input
            className="signin-input"
            type="text"
            value={userName}
            autoComplete="current-username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
          ></input>
          <label className="signin-label" htmlFor="username">
            Password
          </label>
          <input
            className="signin-input"
            type="password"
            value={userPassword}
            autoComplete="current-password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            placeholder="password"
          ></input>

          <button id="signin-button" type="submit">
            Continue
          </button>

          <p id="signin-policy">
            By continuing, you agree to NC marketplace's{" "}
            <a>Conditions of Use & Sale</a>. Please see our{" "}
            <a>Privacy Notice</a>, our <a>Cookies Notice</a> and{" "}
            <a>our Interest-Based Ads Notice</a>.
          </p>
        </form>
      </section>
      {error && <ErrorPage errorMessage={error.error.message} />}
    </div>
  );
}

export default Login;
