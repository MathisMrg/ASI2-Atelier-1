import LoginForm from "../components/login-form/LoginForm";
import React, { Dispatch, SetStateAction } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

interface LoginPageProps {
    setTitle: Dispatch<SetStateAction<string>>,
}

const LoginPage: React.FC<LoginPageProps> = ( {setTitle} ) => {

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);


  if (selectedUser) {
    return <Navigate to="/" />;
  }

  const title = "Login";
  setTitle(title);

  return (
    <div className='page'>
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;