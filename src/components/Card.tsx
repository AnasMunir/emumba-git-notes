import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TCard = {
  url?: string;
  content?: string;
  gistId?: string;
  userLogin?: string;
  showUserLink?: boolean;
  showViewLink?: boolean;
};
function Card({ url, content, gistId, userLogin, showUserLink = true, showViewLink = true }: TCard) {
  const [gistFile, setGistFile] = useState<string[]>([]);
  useEffect(() => {
    if (content) {
      return setGistFile(content?.split(/\r?\n/, 13));
    } else if (url) {
      fetch(url)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          setGistFile(data.split(/\r?\n/, 13));
        });
    }
  }, [url, content]);

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
      <div className='card-footer'>
        {showUserLink && (
          <Link className='btn' to={`/${userLogin}`}>
            User
          </Link>
        )}
        {showViewLink && (
          <Link className='btn' to={`/gists/${gistId}`}>
            View
          </Link>
        )}
      </div>
    </div>
  );
}
export default Card;
