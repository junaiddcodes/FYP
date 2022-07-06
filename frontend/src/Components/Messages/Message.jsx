import React from 'react'
import '../Messages/message.css'
import { format } from 'timeago.js'
import { useEffect, useState } from 'react'

const Message = ({ message, own, currentUser }) => {
  return (
    <div className={own ? 'message own' : 'message '}>
      <div className='messageTop '>
        <p className='messageText'>{message.text}</p>
      </div>
      <div className='messageBottom '>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
