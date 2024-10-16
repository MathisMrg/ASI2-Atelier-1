import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/BuyPage";
import { Routes, Route } from "react-router-dom";
import { User } from "./model/userModel";
import UserFormPage from "./page/UserFormPage";
import LoggedHome from "./page/LoggedHomePage";
import CreateCardPage from "./page/CreateCardPage";

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
        <Route path="/login" element={<LoginPage setTitle={setTitle} user={user} />} />
        <Route path="/" element={user ? <LoggedHome setTitle={setTitle} /> : <UserFormPage setTitle={setTitle} /> } />
        <Route path="/shop" element={<ShopPage setTitle={setTitle}/>} />
        <Route path="/create" element={<CreateCardPage setTitle={setTitle}/>} />
      </Routes>
    </div>
  );
}

export default App;
