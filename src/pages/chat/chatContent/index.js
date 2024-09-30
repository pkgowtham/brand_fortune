import React from 'react'
import { useStyle } from '../chatStyle'
// import ChatHead from './chatHead'
// import ChatInput from './chatInput'
import ChatMain from './chatMain'
import { makeStyles  } from '@material-ui/core'


const ChatContent = () => {

const classes = useStyle()

  return (
    <div className={classes.chatContentMainContainer}>
     {/* <ChatHead/> */}
     <ChatMain/>
     {/* <ChatInput/> */}
    </div>
  )
}

export default ChatContent