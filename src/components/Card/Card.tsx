import { useEffect, useState } from "react";
import { TGist } from "../../api/gists";
import GistInfo from "../GistInfo/GistInfo";
import "./styles.css";

type TCard = {
  gist: TGist;
  showEnterFile?: boolean;
  showUserLink?: boolean;
};
function Card({ gist, showEnterFile = false, showUserLink = true }: TCard) {
  const [gistFile, setGistFile] = useState<string[]>([]);
  const { owner, created_at } = gist;
  const file = gist.files[Object.keys(gist.files)[0]];

  useEffect(() => {
    if (file.content) {
      return setGistFile(file.content?.split(/\r?\n/, showEnterFile ? undefined : 13));
    } else {
      fetch(file.raw_url)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          setGistFile(data.split(/\r?\n/, showEnterFile ? undefined : 13));
        });
    }
  }, [file.content, file.raw_url]);

  return (
    <div className='card'>
      <div className='card-body'>
        {gistFile.map((line, index) => (
          <div key={index} style={{ display: "flex", fontSize: "12px", height: 20 }}>
            <p style={{ width: 30, color: "#6e7681", paddingRight: "5px" }}>{index + 1}</p>
            <p>{line}</p>
          </div>
        ))}
      </div>
      {showUserLink && (
        <div className='card-footer'>
          <GistInfo
            src={owner.avatar_url}
            gistId={gist.id}
            username={owner.login}
            filename={file.filename}
            createdAt={created_at}
          />
        </div>
      )}
    </div>
  );
}
export default Card;
