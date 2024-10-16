import React from 'react';
import './App.css';
import Header from './components/header/Header';
import UserCreationForm from './components/user-creation-form/UserCreationForm';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <UserCreationForm></UserCreationForm>
      </div>
    </BrowserRouter>
  );
}

export default App;
