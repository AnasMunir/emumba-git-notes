import { useEffect, useState } from "react";

type TCard = {
  url: string;
};
function Card({ url }: TCard) {
  const [gistFile, setGistFile] = useState<string[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data.split(/\r?\n/));
        const formattedData = data.split(/\r?\n/, 13);
        setGistFile(formattedData);
      });
  }, []);
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
        <p>footer</p>
        {/* <Link className='btn' to={post.id.toString()}>
          View
        </Link> */}
      </div>
    </div>
  );
}
export default Card;
