import LoginForm from "../components/login-form/LoginForm";
import React, { Dispatch, SetStateAction } from 'react';
import { User } from "../model/userModel";
import { Navigate } from 'react-router-dom';

interface LoginPageProps {
    setTitle: Dispatch<SetStateAction<string>>,
    user: User | null
}

const LoginPage: React.FC<LoginPageProps> = ( {setTitle, user} ) => {

  if (user) {
    return <Navigate to="/" />;
  }

  const title = "Login";
  setTitle(title);

  return (
    <div className='page'>
      <LoginForm ></LoginForm>
    </div>
  );
};

export default LoginPage;