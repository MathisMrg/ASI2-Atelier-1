import React, { Dispatch, SetStateAction, useEffect } from "react";
import IconButton from "../components/icon-button/IconButton";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";

interface LoggedHomePageProps {
  setTitle: Dispatch<SetStateAction<string>>;
}

const LoggedHome: React.FC<LoggedHomePageProps> = ({ setTitle }) => {
  useEffect(() => {
    let title = "Select your action";
    setTitle(title);
  }, [setTitle]);

  return (
    <div className="LoggedHome-content">
      <IconButton title={"Sell"} iconName={faDollar} />
      <IconButton title={"Buy"} iconName={faShoppingCart} />
      <IconButton title={"Create"} iconName={faFlask} />
    </div>
  );
};

export default LoggedHome;
