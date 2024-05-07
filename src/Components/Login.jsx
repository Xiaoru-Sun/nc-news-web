import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login(props) {
  const [userName, setUsername] = useState("");
  const [displayUserName, setDisplayUserName] = useState("");
  const [isLoggedin, setLoggedin] = useState(false);
  const [error, setError] = useState(false);
  const { setAppLoggedin, setOnLogin } = props;

  setOnLogin(true);

  const handleSignIn = () => {
    axios
      .get(
        `https://project-nc-news-xiaoru-sun.onrender.com/api/users/${userName}`
      )
      .then((res) => {
        console.log(res);
        setLoggedin(true);
        setAppLoggedin(true);
      })
      .catch((err) => {
        setError(true);
      });
  };

  if (isLoggedin) {
    setOnLogin(false);
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
        <form>
          <label id="signin-label">Username</label>
          <input
            id="signin-input"
            type="text"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>

          <button
            id="signin-button"
            type="button"
            onClick={() => {
              setDisplayUserName(userName);
              handleSignIn();
            }}
          >
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
      {error && <p>Username {displayUserName} does not exisit!</p>}
    </div>
  );
}

export default Login;
