import { useContext } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user";

function DropdownMenu({ linkClicked }: { linkClicked: () => void }) {
  const { login, html_url, logout } = useContext(UserContext);

  return (
    <div className='dropdown-menu'>
      <div className='overlay'>
        <ul>
          <li onClick={linkClicked}>Signed in as {login}</li>
          <span className='divider'></span>

          <Link to={`/${login}`} onClick={linkClicked}>
            <li>Your gists</li>
          </Link>

          <li>Starred gists</li>
          <li>Help</li>
          <span className='divider'></span>
          <a href={html_url} target='_blank' onClick={linkClicked}>
            <li>Your GitHub profile</li>
          </a>
          <Link to='/'>
            <li
              onClick={() => {
                logout?.();
                linkClicked();
              }}>
              Sign out
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
