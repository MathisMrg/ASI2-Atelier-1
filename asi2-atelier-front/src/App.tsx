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
import SellPage from "./page/SellPage";
import {subscribeToNotification} from "./service/NotificationService";
import GamePage from "./page/GamePage";

function App() {

  const dispatch = useDispatch();
  const selectUser = (user: User) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };
  let once = false;


  useEffect(() => {
    if(!once){
      subscribeToNotification();
      once = true;
    }
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      selectUser(user);
    }

  }, []);

  const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

  const [title, setTitle] = useState("Add a user");

  return (
    <div className="App">
      <Header title={title}></Header>
      <Routes>
        <Route path="/login" element={<LoginPage setTitle={setTitle} />} />
        <Route path="/" element={selectedUser ? <LoggedHome setTitle={setTitle} /> : <UserFormPage setTitle={setTitle} /> } />
        <Route path="/buy" element={ <ShopPage setTitle={setTitle}/> } />
        <Route path="/sell" element={ <SellPage setTitle={setTitle}/> } />
        <Route path="/create" element={ <CreateCardPage setTitle={setTitle}/> } />
        <Route path="/game" element={ <GamePage setTitle={setTitle}/> } />
      </Routes>
    </div>
  );
}

export default App;
