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
import {subscribeToNotification} from "./service/NotificationService";
import FightPage from "./page/FightPage";
import GamePage from "./page/GamePage";
import { SocketProvider } from "./SocketContext";
import ChatBox from "./components/chat-box/ChatBox";
import { Message } from "./model/messageModel";
import { getUsers } from "./service/UserService";
import { getMessagesHistory } from "./service/ChatService";
import CreateCombatPage from "./page/CreateCombatPage";

function App() {

  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [globalMessages, setGlobalMessages] = useState<Message[]>([]);
  const [connectedUsersList, setConnectedUsersList] = useState<Number[]>([]);
  const [users, setUsers] = useState<User[] | null>(null);
  const gameId = 2;
  const selectUser = (user: User) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };
  let once = false;
  const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

  let socket = useMemo(() => {
    return io(process.env.REACT_APP_CHAT_URL, {
      path: "/chat.io",
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
      updateHistory();
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

      socket.on('connected-users', (data) => {
        setConnectedUsersList(data)
      });

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

  const updateHistory = () => {
    console.log("updated")
    getUsers().then(users => {
      setUsers(users);
      getMessagesHistory().then(messagesHistory => {
        if (messagesHistory) {

          for (const messageDTO of messagesHistory) {
            const receiver = users?.find(user => user.id === Number(messageDTO.receiverId));
            const sender = users?.find(user => user.id === Number(messageDTO.senderId));
            if (sender) {
              let message: Message = {
                message: messageDTO.message,
                sender: sender,
                date: messageDTO.sentAt,
                receiver: receiver,
              }
              if (messageDTO.receiverId === null) {
                globalMessages.push(message);
              } else {
                messages.push(message);
              }
            }
          }
        }
        console.log(globalMessages)
        console.log(messages)
      });
    });

  }


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
        <Route path="/" element={selectedUser ? <LoggedHome setTitle={setTitle} socket={socket} /> : <UserFormPage setTitle={setTitle} /> } />
        <Route path="/buy" element={ <ShopPage setTitle={setTitle}/> } />
        <Route path="/sell" element={ <SellPage setTitle={setTitle}/> } />
        <Route path="/create" element={ <CreateCardPage setTitle={setTitle}/> } />
        <Route path="/fight" element={ <FightPage setTitle={setTitle}/> } />
        <Route path="/game" element={ <GamePage setTitle={setTitle}/> } />
      </Routes>
      {selectedUser ? <ChatBox
        globalMessages={globalMessages}
        privateMessages={messages}
        connectedUsersList={connectedUsersList}
        sendGlobalMessage={sendGlobalMessage}
        sendPrivateMessage={sendPrivateMessage}
      /> : <span></span>}

    </div>
  );
}

export default App;
