import React, { Dispatch, SetStateAction, useEffect } from "react";
import IconButton from "../components/icon-button/IconButton";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Socket, io } from "socket.io-client";
import { User } from "../model/userModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoggedHomePageProps {
  setTitle: Dispatch<SetStateAction<string>>;
  socket: Socket;
}

const LoggedHome: React.FC<LoggedHomePageProps> = ({ setTitle, socket }) => {
  useEffect(() => {
    let title = "Select your action";
    setTitle(title);
  }, [setTitle]);

  const dispatch = useDispatch();
  const selectUser = (user: User | null) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };
  function logout() {
    if (socket) {
      socket.disconnect();
    }
    selectUser(null);
    localStorage.removeItem('user');
  }

  return (
    <div className="LoggedHome-content">
      <IconButton title={"Sell"} iconName={faDollar} />
      <IconButton title={"Buy"} iconName={faShoppingCart} />
      <IconButton title={"Create"} iconName={faFlask} />
      <IconButton title={"Game"} iconName={faGamepad} />
      <button className="Icone-button" onClick={logout}> <FontAwesomeIcon
        icon={faRightFromBracket}
      /> Logout</button>
    </div>
  );
};

export default LoggedHome;
