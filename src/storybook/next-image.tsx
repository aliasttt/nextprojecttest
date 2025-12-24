import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  // NextImage props that appear in our components
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export default function NextImage({ fill, style, ...props }: Props) {
  const nextStyle = fill
    ? { ...style, width: "100%", height: "100%", objectFit: "cover" as const }
    : style;
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  return <img {...props} style={nextStyle} />;
}


