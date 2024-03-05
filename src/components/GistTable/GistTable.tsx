import { Link } from "react-router-dom";
import { TGist } from "../../api/gists";
import { getFormattedDate, getFormattedTime } from "../../utils/formatDate";
import Avatar from "../Avatar";
import "./styles.css";

function GistTable({ gists }: { gists: TGist[] }) {
  return (
    <table className='styled-table '>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Filename</th>
          <th>Language</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {gists.map((gist) => (
          <tr key={gist.id} style={{ overflow: "hidden" }}>
            <td>
              <Link to={`/${gist.owner.login}`}>
                <Avatar src={gist.owner.avatar_url} alt={gist.owner.login} />
              </Link>
            </td>
            <td>
              <Link to={`/${gist.owner.login}`}>{gist.owner.login}</Link>
            </td>
            <td>
              <Link to={`${gist.id}`}>{gist.files[Object.keys(gist.files)[0]].filename}</Link>
            </td>
            <td>{gist.files[Object.keys(gist.files)[0]].language}</td>
            <td>{getFormattedDate(gist.created_at, "medium")}</td>
            <td>{getFormattedTime(gist.created_at, "short")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GistTable;
