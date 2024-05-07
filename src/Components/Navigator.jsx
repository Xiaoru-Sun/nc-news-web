import { Link } from "react-router-dom";

function Navigator() {
  return (
    <>
      <nav>
        <ul id="navigator">
          <li>
            <Link className="cursor-pointer">Home</Link>
          </li>
          <li>
            <Link className="cursor-pointer">Coding</Link>
          </li>
          <li>
            <Link className="cursor-pointer">Football</Link>
          </li>
          <li>
            <Link className="cursor-pointer">Cooking</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navigator;
