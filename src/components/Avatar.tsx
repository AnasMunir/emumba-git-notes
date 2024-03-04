interface IAvatar {
  url: string;
  userName: string;
  size: "small" | "large";
}

function Avatar({ url, userName, size }: IAvatar) {
  return (
    <img src={url} alt={userName} height={avatarSize(size)} width={avatarSize(size)} style={{ borderRadius: "50%" }} />
  );
}

function avatarSize(size: "small" | "large"): number {
  if (size === "large") {
    return 260;
  }
  if (size === "small") {
    return 40;
  }
  return 40;
}

export default Avatar;
