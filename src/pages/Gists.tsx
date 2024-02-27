import { useLoaderData } from "react-router-dom";
import { TGist } from "../api/gists";

function Gists() {
  const gists = useLoaderData() as TGist[];
  console.log("gists", gists);
  return (
    <>
      {gists.map((gist) => (
        <div key={gist.id} style={{ display: "flex", justifyContent: "space-around" }}>
          <img
            style={{ borderRadius: "50%", width: 30, height: 30 }}
            src={gist.owner.avatar_url}
            alt={`Avatar-${gist.owner.login}`}
          />
          <h3>{gist.owner.login}</h3>
          <p>{gist.files[Object.keys(gist.files)[0]].filename}</p>
          <div>{new Date(gist.created_at).toLocaleTimeString()}</div>
        </div>
      ))}
    </>
  );
}

export default Gists;
