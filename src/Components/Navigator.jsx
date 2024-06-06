import { Link } from "react-router-dom";
import "./navigator.css";

function Navigator() {
  return (
    <>
      <nav>
        <ul id="navigator">
          <li>
            <Link className="cursor-pointer" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer" to="/coding">
              Coding
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer" to="/football">
              Football
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer" to="/cooking">
              Cooking
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navigator;
