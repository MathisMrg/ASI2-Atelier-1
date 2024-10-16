import React from "react";
import "./IconButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface IconButtonProps {
  iconName: IconProp;
  title: String;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, title }) => {
  return (
    <Link to={"/" + title} className="Icone-button">
      <FontAwesomeIcon
        icon={iconName}
      />
      {title}
    </Link>
    
  );
};

export default IconButton;
