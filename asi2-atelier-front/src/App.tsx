import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/BuyPage";
import { Routes, Route } from "react-router-dom";
import UserFormPage from "./page/UserFormPage";
import { io } from "socket.io-client";
import LoggedHome from "./page/LoggedHomePage";
import CreateCardPage from "./page/CreateCardPage";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./model/userModel";
import SellPage from "./page/SellPage";
import { subscribeToNotification } from "./service/NotificationService";
import GamePage from "./page/GamePage";
import ChatBox from "./components/chat-box/ChatBox";
import { Message } from "./model/messageModel";

function App() {

  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [globalMessages, setGlobalMessages] = useState<Message[]>([]);
  const gameId = 2;
  const selectUser = (user: User) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };
  let once = false;
  const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

  let socket = useMemo(() => {
    return io("http://localhost:4000", {
      auth: {
        userId: selectedUser?.id
      }
    });
  }, [selectedUser]);

  useEffect(() => {
    if (!once) {
      subscribeToNotification();
      once = true;
      const userString = localStorage.getItem("user");
      if (userString) {
        const user: User = JSON.parse(userString);
        selectUser(user);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {

      socket.emit('join-global');
      socket.emit('join-private', selectedUser);

      socket.on('receive-global', (data) => {
        setGlobalMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on('receive-private', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off('receive-global');
        socket.off('receive-private');
      };
    }
  }, [selectedUser, socket]);


  const [title, setTitle] = useState("Add a user");

  const sendPrivateMessage = (message: string, receiver: User) => {
      socket.emit('send-private', {
        sender: selectedUser,
        gameId,
        message,
        receiver: receiver,
        date: new Date()
      });
      setMessages((prevMessages) => [...prevMessages, {
        sender: selectedUser,
        gameId,
        message,
        receiver: receiver,
        date: new Date()
      }]);
  };

  const sendGlobalMessage = (message: string) => {
      socket.emit('send-global', {
        message,
        sender: selectedUser,
        receiver: undefined,
        date: new Date()
      });
  };

  return (
    <div className="App">
      <Header title={title}></Header>
      <Routes>
        <Route path="/login" element={<LoginPage setTitle={setTitle} />} />
        <Route path="/" element={selectedUser ? <LoggedHome setTitle={setTitle} /> : <UserFormPage setTitle={setTitle} />} />
        <Route path="/buy" element={<ShopPage setTitle={setTitle} />} />
        <Route path="/sell" element={<SellPage setTitle={setTitle} />} />
        <Route path="/create" element={<CreateCardPage setTitle={setTitle} />} />
        <Route path="/game" element={<GamePage setTitle={setTitle} />} />
      </Routes>
      {selectedUser ? <ChatBox
        globalMessages={globalMessages}
        privateMessages={messages}
        sendGlobalMessage={sendGlobalMessage}
        sendPrivateMessage={sendPrivateMessage}
      /> : <span></span>}

    </div>
  );
}

export default App;
