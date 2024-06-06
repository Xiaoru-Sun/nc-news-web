import { Link, Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext, useEffect } from "react";
import "./header.css";

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
        <div className="header-flexitem">
          <h3 className="tooltip">
            <Link className="h3-link" to="/" onClick={() => {}}>
              NC NostalgiaNews
            </Link>
            <span className="tooltiptext">Go to Homepage</span>
          </h3>
        </div>
        <div className="header-flexitem img-button-container">
          {userLoggedin ? (
            <button
              className="login-button"
              type="button"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </button>
          ) : (
            <Link to="/log-in">
              <button
                className="login-button"
                type="button"
                onClick={() => {
                  handleLogin();
                }}
              >
                Log In
              </button>
            </Link>
          )}

          {userLoggedin ? (
            <>
              <span className="img-button-container-span">
                <img className="avatar" src={account.avatar_url}></img>
              </span>
            </>
          ) : (
            <span>
              <img className="atar"></img>
            </span>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
