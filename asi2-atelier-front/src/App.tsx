import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/BuyPage";
import { Routes, Route } from "react-router-dom";
import { User } from "./model/userModel";
import UserFormPage from "./page/UserFormPage";
import LoggedHome from "./page/LoggedHomePage";

function App() {

  
  const userTmp: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    balance: 5000,
  };

  const [user, setUser] = useState<null | User>(userTmp);
  const [title, setTitle] = useState("Add a user");

  return (
    <div className="App">
      <Header user={user} title={title}></Header>
      <Routes>
        <Route path="/login" element={<LoginPage setTitle={setTitle}/>} />
        <Route path="/signup" element={<UserFormPage/>} />
        <Route path="/" element={user ? <LoggedHome setTitle={setTitle} /> : <LoginPage setTitle={setTitle} /> } />
        <Route path="/shop" element={<ShopPage setTitle={setTitle}/>} />

      </Routes>
    </div>
  );
}

export default App;
