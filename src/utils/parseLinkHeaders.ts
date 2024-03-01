export type TPaginationLinks = {
  links: {
    prev?: string;
    next?: string;
    last?: string;
    first?: string;
  };
};

export function parseLinkHeader(linkHeader: string): TPaginationLinks {
  if (!linkHeader)
    return {
      links: {
        prev: undefined,
        next: undefined,
        last: undefined,
        first: undefined,
      },
    };
  const linkHeadersArray = linkHeader.split(", ").map((header) => header.split("; "));
  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
    const thisHeaderUrl = header[0].slice(1, -1).split("?")[1];
    return [thisHeaderRel, thisHeaderUrl];
  });

  return { links: Object.fromEntries(linkHeadersMap) };
}
