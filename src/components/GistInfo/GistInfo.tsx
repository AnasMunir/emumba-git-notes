import Avatar from "../Avatar";
import "./styles.css";

interface IGistInfo {
  username: string;
  filename: string;
  createdAt: string;
}
function GistInfo({ username, filename, createdAt }: IGistInfo) {
  const date = new Date(createdAt);
  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date.toString() === "Invalid Date" ? undefined : date);

  return (
    <div className='gist-info'>
      <div>
        <Avatar src='https://avatars.githubusercontent.com/u/8572727?v=4' alt='anas' />
      </div>
      <div className='title'>
        {username && filename && (
          <p>
            {username} / <span id='filename'>{filename}</span>
          </p>
        )}
        {date.toString() !== "Invalid Date" && <p>Create {formattedDateTime}</p>}
      </div>
    </div>
  );
}

export default GistInfo;
