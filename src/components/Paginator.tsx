import { Link } from "react-router-dom";
import { TPaginationLinks } from "../utils/parseLinkHeaders";

function Paginator({ links }: TPaginationLinks) {
  const { prev, first, last, next } = links;
  const showPagination = Boolean(prev || first || last || next);
  return (
    <div style={{ display: showPagination ? "flex" : "none", justifyContent: "space-evenly" }}>
      <LinkButton pageLink={first} linkText='First' />
      <LinkButton pageLink={prev} linkText='Prev' />
      <LinkButton pageLink={next} linkText='Next' />
      <LinkButton pageLink={last} linkText='Last' />
    </div>
  );
}

function LinkButton({ pageLink, linkText }: { pageLink?: string; linkText: string }) {
  return (
    <button className='btn' disabled={!pageLink}>
      <Link style={{ textDecoration: "none", pointerEvents: pageLink ? "all" : "none" }} to={`?${pageLink}`}>
        {linkText}
      </Link>
    </button>
  );
}

export default Paginator;
