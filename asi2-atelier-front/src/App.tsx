import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/BuyPage";
import { Routes, Route } from "react-router-dom";
import UserFormPage from "./page/UserFormPage";
import LoggedHome from "./page/LoggedHomePage";
import CreateCardPage from "./page/CreateCardPage";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./model/userModel";

function App() {

  const dispatch = useDispatch();
  const selectUser = (user: User) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    console.log(userString)
    if (userString) {
      const user: User = JSON.parse(userString);
      selectUser(user);
    }
  }, []);

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

  const [title, setTitle] = useState("Add a user");

  return (
    <div className="App">
      <Header title={title}></Header>
      <Routes>
        <Route path="/login" element={<LoginPage setTitle={setTitle} />} />
        <Route path="/" element={selectedUser ? <LoggedHome setTitle={setTitle} /> : <UserFormPage setTitle={setTitle} /> } />
        <Route path="/shop" element={<ShopPage setTitle={setTitle}/>} />
        <Route path="/create" element={<CreateCardPage setTitle={setTitle}/>} />
      </Routes>
    </div>
  );
}

export default App;
