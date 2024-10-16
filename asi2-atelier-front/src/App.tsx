import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/ShopPage";
import { Routes, Route } from "react-router-dom";
import { User } from "./model/userModel";

function App() {

  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    balance: 5000,
  };

  return (
    <div className="App">
      <Header user={user}></Header>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/shop" element={<ShopPage/>} />
      </Routes>
    </div>
  );
}

export default App;
