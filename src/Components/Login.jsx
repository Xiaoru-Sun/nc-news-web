import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import ErrorPage from "./ErrorPage";
import { fetchAllUsers } from "../utils/app";

function Login(props) {
  const [pickedUser, setPickedUser] = useState({ username: "", name: "" });
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const { userLoggedin, setUserLoggedin, setAccount } =
    useContext(UserLoginContext);
  const { setOnLogin } = props;

  const handleSignIn = (e) => {
    e.preventDefault();
    setUserLoggedin(true);
    localStorage.setItem("user", JSON.stringify(pickedUser));
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
        {allUsers.length ? (
          <ol
            start={0}
            style={{
              display: "flex",
              flexDirection: "row",
              height: "125px",
              padding: "0",
              marginBottom: "20px",
              justifyContent: "space-around",
            }}
          >
            {allUsers.map((user, index) => {
              return (
                <li
                  key={index}
                  style={{
                    textAlign: "center",
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    listStyle: "none",
                    minWidth: "0",
                    backgroundColor: "white",
                    marginLeft: "5px",
                    marginRight: "5px",
                    padding: "5px",
                  }}
                  onClick={() => {
                    setPickedUser(user);
                  }}
                >
                  <img
                    alt={`avartar image of the user ${user.username}`}
                    src={user.avatar_url}
                    style={{
                      height: "75%",
                    }}
                  ></img>
                  <p
                    style={{
                      height: "5%",
                      fontSize: "x-small",
                      margin: "0",
                    }}
                  >
                    {user.name}
                  </p>
                </li>
              );
            })}
          </ol>
        ) : null}
        <p
          id="signin-h2"
          style={{
            color: "rgba(15, 2, 2, 0.87)",
          }}
        >
          Pick an user to log in
        </p>
        <form
          style={{ marginTop: "20px" }}
          onSubmit={(e) => {
            handleSignIn(e);
          }}
        >
          {/* <label className="signin-label" htmlFor="username">
            UserName
          </label> */}
          <input
            className="signin-input"
            type="text"
            defaultValue={pickedUser.username}
            autoComplete="current-username"
            placeholder="username"
            style={{
              padding: "3px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "20px",
              maxWidth: "90px",
              borderRadius: "7px",
            }}
          ></input>
          {/* <label className="signin-label" htmlFor="name">
            Name
          </label> */}
          <input
            className="signin-input"
            type="text"
            defaultValue={pickedUser.name}
            autoComplete="current-password"
            placeholder="name"
            style={{
              padding: "3px",
              maxWidth: "90px",
              marginRight: "20px",
              borderRadius: "7px",
            }}
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
