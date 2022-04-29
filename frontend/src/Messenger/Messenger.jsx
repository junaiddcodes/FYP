import './messenger.css'
import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../../src/Components/TopBar'
import Conversation from '../Components/conversaion/Conversation'
import Message from '../Components/Messages/Message'
import ChatOnline from '../Components/chatOnline/ChatOnline'
import userService from '../services/UserService'
import axios from 'axios'

const Messenger = () => {
  const [conversations, setConsversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const user_id = userService.getLoggedInUser()._id
  const scrollref = useRef()
  const getConversations = async () => {
    try {
      const res = await axios.get('conversation/' + user_id)

      setConsversation(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getConversations()
    console.log(user_id)
  }, [user_id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('message/' + currentChat._id)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user_id,
      text: newMessage,
      conversationId: currentChat._id,
    }
    try {
      const res = await axios.post('message/', message)
      setMessages([...messages, res.data])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="search of friends"
              className="chatMessageInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user_id} />
              </div>
            ))}
          </div>
        </div>

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
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                chat is empty start new conversation
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline ">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
