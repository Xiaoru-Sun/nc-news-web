import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";

function Login(props) {
  const [userName, setUsername] = useState("");
  const [displayUserName, setDisplayUserName] = useState("");
  const [error, setError] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const { userLoggedin, setUserLoggedin, setAccountName } =
    useContext(UserLoginContext);
  const { setOnLogin } = props;

  useEffect(() => {}, [allUsers]);

  useEffect(() => {
    // Check if allUsers is not empty
    if (allUsers.length > 0 && userName) {
      if (allUsers.includes(userName)) {
        setUserLoggedin(true);
        setAccountName(userName);
        setOnLogin(false);
        // Perform actions for valid user
      } else {
        setError(true);
        // Perform actions for invalid user
      }
    }
  }, [allUsers, userName]);

  const handleSignIn = () => {
    axios
      .get(`https://project-nc-news-xiaoru-sun.onrender.com/api/users`)
      .then((res) => {
        let allNames = res.data.users.map((obj) => obj.username);
        setAllUsers((preAllUsers) => {
          const currAllUsers = [...preAllUsers, ...allNames];
          return currAllUsers;
        });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
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
