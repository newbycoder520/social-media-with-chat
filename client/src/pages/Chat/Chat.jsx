import React from 'react'
import "./Chat.css";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userChats } from '../../components/api/ChatRequests';
import Conversation from 'components/Conversation/Conversation';
import ChatBox from 'components/ChatBox/ChatBox';
import { io } from "socket.io-client";
import { Divider, useTheme } from "@mui/material";
import ChatNavbar from 'scenes/navbar/chatNavbar';

const Chat = () => {
  const socket = useRef();
  const user = useSelector((state) => state.user); 
  
 const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const theme = useTheme();

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div><ChatNavbar/><Divider/>
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <input placeholder='Search For Friends' className='chatMenuInput'/>
          <div className="Chat-list">
            {chats.slice(0, 8).map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              > 
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div><button color='red' type="button" class="btn btn-primary" display='flex' justifyContent='center' alignItem='center' onClick={() => setShowMore(true)}>See All</button>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
      </div>
      </div>
  );
};

export default Chat;