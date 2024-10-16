import LoginForm from "../components/login-form/LoginForm";
import React, { Dispatch, SetStateAction } from 'react';
import { User } from "../model/userModel";
import { Navigate } from 'react-router-dom';

interface LoginPageProps {
    setTitle: Dispatch<SetStateAction<string>>,
    setUser: Dispatch<SetStateAction<User|null>>,
    user: User | null
}

const LoginPage: React.FC<LoginPageProps> = ( {setTitle, user, setUser} ) => {

  if (user) {
    return <Navigate to="/" />;
  }

  const title = "Login";
  setTitle(title);

  return (
    <div className='page'>
      <LoginForm setUser={setUser}></LoginForm>
    </div>
  );
};

export default LoginPage;