import React from 'react'
import '../chatOnline/chatonline.css'

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Hassan Iftikhar</span>
      </div>
    </div>
  )
}

export default ChatOnline
