import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../App";
import { getToken, getUser } from "../api/user";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";

function NavBar() {
  const { localLogin, setUserInfo, accessToken, id, login, avatar_url } = useContext(AuthContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const code = urlParams.get("code");

  async function loginToGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=repo%20gist%20user&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`
    );
  }

  useEffect(() => {
    if (accessToken !== undefined) {
      getUser(accessToken).then((user) => setUserInfo?.(user));
      return;
    }

    const fetchData = async (code: string) => {
      const { access_token } = await getToken(code);
      localLogin?.(access_token || "");
      const user = await getUser(access_token);
      setUserInfo?.(user);
    };

    if (code != null) {
      fetchData(code);
    }
  }, [accessToken, code]);

  return (
    <>
      <nav className='top-nav'>
        <div className='nav-text-large'>
          <Link to='/'>EMUMBA Git Notes</Link>
        </div>

        {id ? (
          <img
            src={avatar_url}
            alt={login}
            height={40}
            width={40}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={handleMouseClick}
          />
        ) : (
          <button className='btn' onClick={loginToGithub}>
            Login
          </button>
        )}
      </nav>
      {isDropdownVisible && <DropdownMenu linkClicked={handleMouseClick} />}
    </>
  );
}

export default NavBar;
