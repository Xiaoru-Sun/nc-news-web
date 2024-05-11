import { Link, Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext, useEffect } from "react";

function Header(props) {
  const { setOnLogin } = props;
  const { userLoggedin, setUserLoggedin, account, setAccount } =
    useContext(UserLoginContext);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      console.log(loggedInUser);
      setAccount(loggedInUser);
      setUserLoggedin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserLoggedin(false);
    setAccount({});
  };

  const handleLogin = () => {
    setOnLogin(true);
    <Navigate to="/log-in"></Navigate>;
  };

  return (
    <>
      <header>
        <Link id="nostalgia" to="/" onClick={() => {}}>
          <h3 className="tooltip">
            NC NostalgiaNews
            <span className="tooltiptext">Go to Homepage</span>
          </h3>
        </Link>
        {!userLoggedin && (
          <Link to="/log-in">
            <button
              type="button"
              id="header-signin"
              onClick={() => handleLogin()}
            >
              Log In
            </button>
          </Link>
        )}
        {userLoggedin && (
          <>
            <span>
              {/* <p>{account.userName}</p> */}
              <img className="avatar" src={account.avatar_url}></img>
            </span>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
