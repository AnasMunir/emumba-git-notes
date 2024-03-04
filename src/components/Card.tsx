import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TGist } from "../api/gists";
import GistInfo from "./GistInfo/GistInfo";

type TCard = {
  gist: TGist;
  showUserLink?: boolean;
};
function Card({ gist, showUserLink = true }: TCard) {
  const [gistFile, setGistFile] = useState<string[]>([]);
  const { id, owner, created_at } = gist;
  const file = gist.files[Object.keys(gist.files)[0]];
  useEffect(() => {
    if (file.content) {
      return setGistFile(file.content?.split(/\r?\n/, 13));
    } else {
      fetch(file.raw_url)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          setGistFile(data.split(/\r?\n/, 13));
        });
    }
  }, [file.content, file.raw_url]);

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='card-preview-text'>
          {gistFile.map((line, index) => (
            <div key={index} style={{ display: "flex", fontSize: "12px", height: 20 }}>
              <p style={{ width: 30, color: "#6e7681", paddingRight: "5px" }}>{index + 1}</p>
              <p>{line}</p>
            </div>
          ))}
        </div>
      </div>
      {showUserLink && (
        <div className='card-footer'>
          <GistInfo gistId={gist.id} username={owner.login} filename={file.filename} createdAt={created_at} />
        </div>
      )}
    </div>
  );
}
export default Card;
