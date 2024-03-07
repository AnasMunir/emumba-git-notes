import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../../App";
import { getToken, getUser } from "../../api/user";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Form, Link } from "react-router-dom";
import Avatar from "../Avatar";
import "./styles.css";

function NavBar() {
  const { localLogin, setUserInfo, accessToken, id, login, avatar_url } = useContext(UserContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
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

  function handleMouseClick() {
    setDropdownVisible(!isDropdownVisible);
  }

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (searchInputRef.current != null) {
      searchInputRef.current.value = e.currentTarget.value;
    }
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
        <div className='nav-content'>
          <div className='nav-text-large'>
            <Link to='/'>EMUMBA Git Notes</Link>
          </div>
          <div>
            {id ? (
              <>
                <div style={{ position: "relative" }}>
                  <Form method='POST'>
                    <input type='text' name='searchInput' ref={searchInputRef} onChange={handleSearchInput} />
                    <button type='submit'>search</button>
                  </Form>
                  <Avatar src={avatar_url!} alt={login!} onClick={handleMouseClick} />
                  {isDropdownVisible && <DropdownMenu linkClicked={handleMouseClick} />}
                </div>
              </>
            ) : (
              <button className='btn' onClick={loginToGithub}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
