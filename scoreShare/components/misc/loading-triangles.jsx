import React from "react";
import { RotatingTriangles } from "react-loader-spinner";

export const LoadingTriangles = ({ size, className, style }) => {
  return (
    <RotatingTriangles
      visible={true}
      color="#4fa94d"
      ariaLabel="rotating-triangles-loading"
      wrapperClass={className}
      wrapperStyle={{
        ...style,
        aspectRatio: "square",
        zIndex: 1000,
        width: "2rem"
      }}
    />
  );
};
