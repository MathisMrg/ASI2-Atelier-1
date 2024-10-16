import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/BuyPage";
import { Routes, Route } from "react-router-dom";
import { User } from "./model/userModel";
import UserFormPage from "./page/UserFormPage";

function App() {

  const [title, setTitle] = useState("Add a user");

  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    balance: 5000,
  };

  return (
    <div className="App">
      <Header user={null} title={title}></Header>
      <Routes>
        <Route path="/" element={<LoginPage setTitle={setTitle}/>} />
          <Route path="/signup" element={<UserFormPage/>} />
        <Route path="/shop" element={<ShopPage setTitle={setTitle}/>} />
      </Routes>
    </div>
  );
}

export default App;
