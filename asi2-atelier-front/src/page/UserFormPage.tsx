import React, { Dispatch, SetStateAction, useEffect } from "react";
import UserCreationForm from "../components/user-creation-form/UserCreationForm";

interface UserFormPageProps {
  setTitle: Dispatch<SetStateAction<string>>;
}

const UserFormPage: React.FC<UserFormPageProps> = ({ setTitle }) => {
  useEffect(() => {
    let title = "Add an user";
    setTitle(title);
  }, [setTitle]);

  return (
    <div>
      <UserCreationForm></UserCreationForm>
    </div>
  );
};

export default UserFormPage;
