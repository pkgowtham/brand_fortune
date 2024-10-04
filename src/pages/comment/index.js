import React from 'react'
import ChatMain from './chatMain.js';
import { useLocation } from 'react-router-dom';

function Comment() {
  const location = useLocation();
  const {state} = location;
 
  return (
    <div className='Maincontainer'>      
      <ChatMain id = {state._id}/>
    </div>
  )
}

export default Comment;  