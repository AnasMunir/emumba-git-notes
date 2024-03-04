import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import "./styles.css";

interface IGistInfo {
  gistId: string;
  username: string;
  filename: string;
  createdAt: string;
}
function GistInfo({ gistId, username, filename, createdAt }: IGistInfo) {
  const date = new Date(createdAt);
  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date.toString() === "Invalid Date" ? undefined : date);

  return (
    <div className='gist'>
      <div>
        <Avatar src='https://avatars.githubusercontent.com/u/8572727?v=4' alt='anas' />
      </div>
      <div className='info'>
        {username && filename && (
          <p className='title'>
            <Link to={`/${username}`}>{username} / </Link>
            <Link to={`/gists/${gistId}`}>
              <span> {filename}</span>
            </Link>
          </p>
        )}
        <div className='subtitle'>{date.toString() !== "Invalid Date" && <p>Create {formattedDateTime}</p>}</div>
      </div>
    </div>
  );
}

export default GistInfo;
