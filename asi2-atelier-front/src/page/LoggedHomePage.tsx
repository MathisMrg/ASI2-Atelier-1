import React, { Dispatch, SetStateAction, useEffect } from "react";
import IconButton from "../components/icon-button/IconButton";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { User } from "../model/userModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoggedHomePageProps {
  setTitle: Dispatch<SetStateAction<string>>;
}

const LoggedHome: React.FC<LoggedHomePageProps> = ({ setTitle }) => {
  useEffect(() => {
    let title = "Select your action";
    setTitle(title);
  }, [setTitle]);

  const dispatch = useDispatch();
  const selectUser = (user: User | null) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };
  function logout() {
    selectUser(null);
    localStorage.removeItem('user');
  }

  return (
    <div className="LoggedHome-content">
      <IconButton title={"Sell"} iconName={faDollar} />
      <IconButton title={"Buy"} iconName={faShoppingCart} />
      <IconButton title={"Create"} iconName={faFlask} />
      <IconButton title={"Game"} iconName={faFlask} />
      <button className="Icone-button" onClick={logout}> <FontAwesomeIcon
        icon={faRightFromBracket}
      /> Logout</button>
    </div>
  );
};

export default LoggedHome;
