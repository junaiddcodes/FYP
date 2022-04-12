import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../conversaion/conversation.css'

const Conversation = ({ conversation, currentUser }) => {
  var friendId = 0
  const [name, setName] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    friendId = conversation.members.find((m) => m != currentUser)
    // console.log(friendId)
    const getUser = async () => {
      try {
        const res = await axios.get('trainer/' + friendId)

        setUser(res.data)
        setName(res.data.crud.user_id.full_name)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
    console.log(friendId)
  }, [currentUser, conversation])

  return (
    <div className="conversation">
      <img
        className="converstionImage"
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        alt=""
      />
      <span className="conversationName">{name}</span>
    </div>
  )
}

export default Conversation
