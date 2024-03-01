import { useContext } from "react";
import "./styles.css";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const { login, html_url } = useContext(AuthContext);

  return (
    <div className='dropdown-menu'>
      <div className='overlay'>
        <ul>
          <li>Signed in as {login}</li>
          <span className='divider'></span>
          <li>
            <Link to={`/${login}`}>Your gists</Link>
          </li>
          <li>Starred gists</li>
          <li>Help</li>
          <span className='divider'></span>
          <li>
            <a href={html_url} target='_blank'>
              Your GitHub profile
            </a>
          </li>
          <li>Sign out</li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
