import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/ShopPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/shop" element={<ShopPage/>} />
      </Routes>
    </div>
  );
}

export default App;
