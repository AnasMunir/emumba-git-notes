function ListIcon({ fill }: { fill?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40'>
      <g id='_01_align_center' data-name='01 align center'>
        <rect x='7' y='4' width='17' height='2' fill={fill} />
        <rect x='7' y='11' width='17' height='2' fill={fill} />
        <rect x='7' y='18' width='17' height='2' fill={fill} />
        <circle cx='2' cy='5' r='2' fill={fill} />
        <circle cx='2' cy='12' r='2' fill={fill} />
        <circle cx='2' cy='19' r='2' fill={fill} />
      </g>
    </svg>
  );
}

export default ListIcon;
