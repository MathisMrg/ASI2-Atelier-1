import React from "react";
import "./IconButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  iconName: IconProp;
  title: String;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, title }) => {
  return (
    <button className="Icone-button">
      <FontAwesomeIcon
        icon={iconName}
      />
      {title}
    </button>
  );
};

export default IconButton;
