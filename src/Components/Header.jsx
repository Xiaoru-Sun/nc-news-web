import { Link, Navigate } from "react-router-dom";

function Header(props) {
  const { setOnLogin } = props;

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
        <Link to="/log-in">
          <button
            type="button"
            id="header-signin"
            onClick={() => handleLogin()}
          >
            Log in
          </button>
        </Link>
      </header>
    </>
  );
}

export default Header;
