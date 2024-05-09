import { Link, Navigate } from "react-router-dom";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext } from "react";

function Header(props) {
  const { setOnLogin } = props;
  const { userLoggedin, accountName } = useContext(UserLoginContext);

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
        {userLoggedin && <p>Hello {accountName}</p>}
      </header>
    </>
  );
}

export default Header;
