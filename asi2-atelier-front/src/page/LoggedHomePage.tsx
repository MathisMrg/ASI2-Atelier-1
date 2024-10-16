
import React, { Dispatch, SetStateAction } from "react";

interface LoggedHomePageProps {
  setTitle: Dispatch<SetStateAction<string>>
}


const LoggedHome: React.FC<LoggedHomePageProps> = ({ setTitle }) => {

  let title = "Select your action";
  setTitle(title);

  return (
    <div></div>
  );
};

export default LoggedHome;
