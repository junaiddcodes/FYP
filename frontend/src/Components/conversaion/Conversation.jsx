import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../conversaion/conversation.css'

const Conversation = ({
  conversation,
  currentUser,
  currentUserType,
  flag,
  isCurrent,
}) => {
  var friendId = 0
  const [name, setName] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    friendId = conversation.members.find((m) => m != currentUser)
    if (currentUserType == 'customer') {
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
    } else if (currentUserType == 'trainer') {
      const getUser = async () => {
        try {
          const res = await axios.get('customer/' + friendId)

          setUser(res.data)
          setName(res.data.crud.user_id.full_name)
        } catch (err) {
          console.log(err)
        }
      }
      getUser()
    } else if (currentUserType == 'customer') {
      const getUser = async () => {
        try {
          const res = await axios.get('admin/' + friendId)

          setUser(res.data)
          setName(res.data.crud.user_id.full_name)
        } catch (err) {
          console.log(err)
        }
      }
      getUser()
    }

    // console.log(friendId)

    console.log(friendId)
  }, [currentUser, conversation])

  return (
    <>
      <div className={isCurrent ? 'conversationNameSelected' : 'conversation'}>
        <span className='conversationName'>{name}</span>
      </div>
    </>
  )
}

export default Conversation
