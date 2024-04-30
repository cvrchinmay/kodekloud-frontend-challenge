import React from "react";
import Button from "./Button";
import Image from "next/image";

interface IconButtonProps {
  icon: string;
  handleOnClick: () => void;
  text?: string;
  className?: string;
  iconClass?: string;
  iconHeight?: number;
  iconWeight?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  handleOnClick,
  text = "",
  className,
  iconClass = "",
  iconHeight = 32,
  iconWeight = 32,
}) => {
  const ImageComponent = (
    <Image
      src={icon}
      height={iconHeight}
      width={iconWeight}
      alt="icon"
      className={iconClass}
    />
  );

  return (
    <Button
      onClick={handleOnClick}
      className={`flex items-center gap-1 md:gap-1.5 bg-black ${className}`}
    >
      {ImageComponent}
      <span className="pr-0.5">{text}</span>
    </Button>
  );
};

export default IconButton;
