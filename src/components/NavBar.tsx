import { useContext, useEffect } from "react";

import { AuthContext } from "../App";
import { getToken, getUser } from "../api/user";
import { Link } from "react-router-dom";

function NavBar() {
  const { localLogin, setUserInfo, accessToken, id, login, avatar_url } = useContext(AuthContext);
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const code = urlParams.get("code");

  async function loginToGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
        import.meta.env.VITE_REDIRECT_URI
      }`
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
    <nav className='top-nav'>
      <div className='nav-text-large'>EMUMBA</div>

      {id ? (
        <Link to={`/${login}`}>
          <img src={avatar_url} alt={login} height={60} width={60} style={{ borderRadius: "50%" }} />
        </Link>
      ) : (
        <button onClick={loginToGithub}>Login</button>
      )}
    </nav>
  );
}

export default NavBar;
