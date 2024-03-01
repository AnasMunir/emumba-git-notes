import "./index.css";

function DropdownMenu() {
  return (
    <div className='dropdown-menu'>
      <div className='overlay'>
        <ul>
          <li>Signed in as Anas Munir Sheikh Jee</li>
          <span className='divider'></span>
          <li>Your gists</li>
          <li>Starred gists</li>
          <li>Help</li>
          <span className='divider'></span>
          <li>Your GitHub profile</li>
          <li>Sign out</li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
