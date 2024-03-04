interface IAvatar {
  src: string;
  alt: string;
  size?: "small" | "large";
  onClick?: () => void;
}

function Avatar({ src, alt, size = "small", onClick }: IAvatar) {
  return (
    <img
      src={src}
      alt={alt}
      height={avatarSize(size)}
      width={avatarSize(size)}
      style={{ borderRadius: "50%", cursor: "pointer" }}
      onClick={onClick}
    />
  );
}

function avatarSize(size: "small" | "large"): number {
  if (size === "large") {
    return 260;
  }
  if (size === "small") {
    return 50;
  }
  return 40;
}

export default Avatar;
