import "./messenger.css";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "../Components/TopBar";
import Conversation from "../Components/conversaion/Conversation";
import Message from "../Components/Messages/Message";
// import ChatOnline from '../Components/chatOnline/ChatOnline'
import userService from "../services/UserService";
import axios from "axios";
import SideMenuBack from "../Components/SideMenuBack";
import SideMenuTrainer from "../Components/SideMenuTrainer";
import SideMenu from "../Components/SideMenu";
// import { io } from 'socket.io-client'

const Messenger = () => {
  const [conversations, setConsversation] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [socket, setSocket] = useState(null)
  const user_id = userService.getLoggedInUser()._id;
  const scrollref = useRef();
  const user_type = userService.getLoggedInUser().user_type;

  const user_name = userService.getLoggedInUser().full_name;

  console.log(user_type);
  // useEffect(() => {
  //   setSocket(io('ws://localhost:8900'))
  // }, [])

  // useEffect(() => {
  //   socket?.on('welcome', (message) => {
  //     console.log(message)
  //   })
  // }, [socket])

  const getConversations = async () => {
    try {
      const res = await axios.get("conversation/" + user_id);

      setConsversation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversations();
    console.log(user_id);
  }, [user_id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("message/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user_id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("message/", message);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="page-container-user">
      <TopBar />
      {}

      {user_type == "customer" ? <SideMenu /> : user_type == "trainer" ? <SideMenuTrainer /> : null}
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollref}>
                      <Message message={m} own={m.sender === user_id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Please enter your message here"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton " onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">chat is empty start new conversation</span>
            )}
          </div>
        </div>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div>
              <h1 className="chats">Chats</h1>
            </div>
            {conversations.map((c, key) => (
              <div onClick={() => setCurrentChat(c)} key={key}>
                <Conversation
                  conversation={c}
                  currentUser={user_id}
                  isCurrent={currentChat?._id === c?._id ? true : false}
                  currentUserType={user_type}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
