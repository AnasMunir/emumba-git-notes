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
          <th>Date</th>
          <th>Time</th>
          <th>Language</th>
          <th>Filename</th>
        </tr>
      </thead>
      <tbody>
        {gists.map((gist) => (
          <tr key={gist.id} style={{ overflow: "hidden" }}>
            <td>
              <Avatar src={gist.owner.avatar_url} alt={gist.owner.login} />
            </td>
            <td>{gist.owner.login}</td>
            <td>{getFormattedDate(gist.created_at, "medium")}</td>
            <td>{getFormattedTime(gist.created_at, "short")}</td>
            <td>{gist.files[Object.keys(gist.files)[0]].language}</td>
            <td>{gist.files[Object.keys(gist.files)[0]].filename}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GistTable;
