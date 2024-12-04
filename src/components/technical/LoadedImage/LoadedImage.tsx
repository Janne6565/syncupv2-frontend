import { useState } from "react";
import { Skeleton } from "@mui/material";

interface LoadedImageProps {
  imageSource: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

const LoadedImage = (props: LoadedImageProps) => {
  const { imageSource, width, height, style } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div
      style={{
        ...style,
        aspectRatio: width / height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={imageSource}
        alt=""
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transition: "all ease .3s",
          left: 0,
          opacity: imageLoaded ? 1 : 0,
          zIndex: 5,
        }}
        onLoad={handleImageLoaded}
      />
      <Skeleton
        width={"100%"}
        variant={"rectangular"}
        height={"auto"}
        style={{
          aspectRatio: width / height,
          opacity: imageLoaded ? 0 : 1,
          position: "absolute",
        }}
      />
    </div>
  );
};

export default LoadedImage;
