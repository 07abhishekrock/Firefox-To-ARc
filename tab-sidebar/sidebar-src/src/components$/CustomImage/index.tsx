const CustomImage = (
  { src, width, height }:
  { src: string;
    width: number;
    height: number;
  }) => {
  return <img src={src}
    width={width}
    height={height}
  />;
};

export default CustomImage;
