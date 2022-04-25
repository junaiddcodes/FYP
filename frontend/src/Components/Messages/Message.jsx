import React from 'react'
import '../Messages/message.css'
import { format } from 'timeago.js'

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message '}>
      <div className="messageTop ">
        <img
          className="converstionImage"
          src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom ">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
